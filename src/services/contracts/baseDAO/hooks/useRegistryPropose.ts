import { TransactionWalletOperation } from "@taquito/taquito";
import { useMutation, useQueryClient } from "react-query";
import { RegistryProposeArgs } from "../registryDAO/types";
import { useNotification } from "modules/common/hooks/useNotification";
import { useTezos } from "services/beacon/hooks/useTezos";
import { RegistryDAO } from "../registryDAO";
import mixpanel from "mixpanel-browser";
import {networkNameMap} from "../../../bakingBad";

export const useRegistryPropose = () => {
  const queryClient = useQueryClient();
  const openNotification = useNotification();
  const { network, tezos, account, connect } = useTezos();

  return useMutation<
    TransactionWalletOperation | Error,
    Error,
    { dao: RegistryDAO; args: RegistryProposeArgs }
  >(
    async ({ dao, args }) => {
      const {
        key: proposalNotification,
        closeSnackbar: closeProposalNotification,
      } = openNotification({
        message: "Proposal is being created...",
        persist: true,
        variant: "info",
      });
      try {
        let tezosToolkit = tezos;

        if (!account) {
          tezosToolkit = await connect();
        }

        const data = await dao.propose(args, tezosToolkit);

        mixpanel.track("Proposal Created", {
          dao: dao.data.address,
          daoType: "Registry"
        })
        
        await data.confirmation(1);
        closeProposalNotification(proposalNotification);

        openNotification({
          message: "Registry proposal transaction confirmed!",
          autoHideDuration: 10000,
          variant: "success",
          detailsLink: `https://${networkNameMap[network]}.tzkt.io/` + data.opHash,
        });
        return data;
      } catch (e) {
        console.error(e);
        closeProposalNotification(proposalNotification);
        openNotification({
          message: "An error has happened with propose transaction!",
          variant: "error",
          autoHideDuration: 10000,
        });
        return new Error((e as Error).message);
      }
    },
    {
      onSuccess: () => {
        queryClient.resetQueries();
      },
    }
  );
};
