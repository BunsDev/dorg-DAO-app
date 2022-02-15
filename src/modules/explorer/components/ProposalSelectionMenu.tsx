/* eslint-disable react/display-name */
import { Grid, styled, Button, Typography } from "@material-ui/core";
import { RegistryProposalFormValues } from "modules/explorer/components/UpdateRegistryDialog";
import { TreasuryProposalFormValues } from "modules/explorer/components/NewTreasuryProposalDialog";
import React, { useState } from "react";
import { useDAO } from "services/indexer/dao/hooks/useDAO";
import { NFTTransferFormValues } from "./NFTTransfer";
import { useDAOID } from "../pages/DAO/router";
import { ProposalFormContainer } from "./ProposalForm";
import { ConfigProposalForm } from "./ConfigProposalForm";
import { ResponsiveDialog } from "./ResponsiveDialog";
import { GuardianChangeProposalForm } from "./GuardianChangeProposalForm";
import { DelegationChangeProposal } from "./DelegationChangeProposalForm";

type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};

type Values = {
  agoraPostId: string;
} & TreasuryProposalFormValues &
  RegistryProposalFormValues &
  NFTTransferFormValues;

export type ProposalFormDefaultValues = RecursivePartial<Values>;

const Content = styled(Grid)({
  padding: "0 25px",
});

interface Props {
  open: boolean;
  handleClose: () => void;
}

enum ProposalModalKey {
  config,
  guardian,
  transfer,
  registry,
  delegation,
}

// const enabledOptions = {
//   registry: [
//     {
//       name: "Change DAO configuration",
//       key: ProposalModalKey.config,
//     },
//     {
//       name: "Update Guardian",
//       key: ProposalModalKey.guardian,
//     },
//     {
//       name: "Transfer funds/tokens/NFTs",
//       key: ProposalModalKey.transfer,
//     },
//     {
//       name: "Update registry",
//       key: ProposalModalKey.registry,
//     },
//   ],
//   treasury: [
//     {
//       name: "Change DAO configuration",
//       key: ProposalModalKey.config,
//     },
//     {
//       name: "Update Guardian",
//       key: ProposalModalKey.guardian,
//     },
//     {
//       name: "Transfer funds/tokens/NFTs",
//       key: ProposalModalKey.transfer,
//     },
//   ],
// };

export const ProposalSelectionMenu: React.FC<Props> = ({ open, handleClose }) => {
  const daoId = useDAOID();
  const { data: dao } = useDAO(daoId);
  const [openModal, setOpenModal] = useState<ProposalModalKey>();

  const handleOptionSelected = (key: ProposalModalKey) => {
    setOpenModal(key);
    handleClose();
  };

  const handleCloseModal = () => {
    setOpenModal(undefined);
  };

  return (
    <>
      <ResponsiveDialog open={open} onClose={handleClose} title={"Add New Proposal"}>
        {dao && (
          <>
            <Content container direction={"column"} style={{ gap: 32 }}>
              <Grid item>
                <Typography variant={"body1"} color={"textPrimary"}>
                  Which proposal would you like to create?
                </Typography>
              </Grid>
              <Grid container justifyContent='center' direction={"column"}>
                <Button
                  variant={"contained"}
                  color={"secondary"}
                  style={{ marginBottom: 20 }}
                  onClick={() => handleOptionSelected(ProposalModalKey.transfer)}>
                  Assets / Registry
                </Button>

                {dao.data.type === "registry" && (
                  <Button
                    variant={"contained"}
                    color={"secondary"}
                    style={{ marginBottom: 20 }}
                    onClick={() => handleOptionSelected(ProposalModalKey.config)}>
                    Configuration
                  </Button>
                )}

                <Button
                  variant={"contained"}
                  color={"secondary"}
                  style={{ marginBottom: 20 }}
                  onClick={() => handleOptionSelected(ProposalModalKey.guardian)}>
                  Change Guardian
                </Button>

                <Button
                  variant={"contained"}
                  color={"secondary"}
                  style={{ marginBottom: 20 }}
                  onClick={() => handleOptionSelected(ProposalModalKey.delegation)}>
                  Change Delegation
                </Button>
              </Grid>
            </Content>
          </>
        )}
      </ResponsiveDialog>
      <ProposalFormContainer
        open={ProposalModalKey.transfer === openModal || ProposalModalKey.registry === openModal}
        handleClose={() => handleCloseModal()}
      />
      <ConfigProposalForm open={ProposalModalKey.config === openModal} handleClose={() => handleCloseModal()} />
      <GuardianChangeProposalForm
        open={ProposalModalKey.guardian === openModal}
        handleClose={() => handleCloseModal()}
      />
      <DelegationChangeProposal
        open={ProposalModalKey.delegation === openModal}
        handleClose={() => handleCloseModal()}
      />
    </>
  );
};
