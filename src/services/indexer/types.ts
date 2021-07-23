import BigNumber from "bignumber.js";
import { DAOTemplate } from "modules/creator/state";
import { TokenMetadata } from "services/bakingBad/tokens";
import { Network } from "services/beacon/context";
import { IndexerStatus } from "./dao/mappers/proposal/types";

export interface DAOTypeDTO {
  id: number;
  name: DAOTemplate;
  daos?: DAODTO[];
}

export interface TokenDTO {
  id: number;
  contract: string;
  network: string;
  level: number;
  timestamp: string;
  token_id: number;
  symbol: string;
  name: string;
  decimals: number;
  is_transferable: boolean;
  should_prefer_symbol: boolean;
  supply: string;
  daos?: DAODTO[];
}

export interface DAODTO {
  id: number;
  address: string;
  admin: string;
  frozen_token_id: number;
  token: TokenDTO;
  guardian: string;
  ledgers?: LedgerDTO[];
  proposals?: ProposalDTO[];
  max_proposals: string;
  max_quorum_change: string;
  max_quorum_threshold: string;
  max_votes: string;
  min_quorum_threshold: string;
  period: string;
  proposal_expired_time: string;
  proposal_flush_time: string;
  quorum_change: string;
  last_updated_cycle: string;
  quorum_threshold: string;
  staked: string;
  start_time: string;
  name: string;
  description: string;
  dao_type: DAOTypeDTO;
  network: Network;
  treasury_extras: [TreasuryExtraDTO] | [];
  registry_extras: [RegistryExtraDTO] | [];
}

export interface RegistryExtraDTO {
  id: number;
  registry: string;
  registry_affected: string;
  frozen_extra_value: string;
  frozen_scale_value: string;
  slash_division_value: string;
  min_xtz_amount: string;
  max_xtz_amount: string;
  slash_scale_value: string;
}

export interface TreasuryExtraDTO {
  id: number;
  frozen_extra_value: string;
  frozen_scale_value: string;
  slash_division_value: string;
  min_xtz_amount: string;
  max_xtz_amount: string;
  slash_scale_value: string;
}

export interface HolderDTO {
  id: number;
  address: string;
  ledgers?: LedgerDTO[];
  proposals?: ProposalDTO[];
  votes?: VoteDTO[];
}

export interface LedgerDTO {
  id: number;
  balance: BigNumber;
  holder: HolderDTO;
}

export interface ProposalStatusDTO {
  id: number;
  description: IndexerStatus;
  proposals?: ProposalDTO[];
}

export interface ProposalStatusUpdateDTO {
    id: number;
    timestamp: string;
    proposal_status: ProposalStatusDTO;
}

export interface ProposalDTO {
  id: number;
  hash: string;
  key: string;
  upvotes: string;
  downvotes: string;
  start_date: string;
  metadata: string;
  holder: HolderDTO;
  status_updates: ProposalStatusUpdateDTO[];
  voting_stage_num: string;
  proposer_frozen_token: string;
  quorum_threshold: string;
  votes: VoteDTO[];
}

export interface VoteDTO {
  id: number;
  hash: string;
  key: string;
  amount: string;
  support: boolean;
  holder: HolderDTO;
}

export interface DAOListItem {
  dao_type: {
    name: DAOTemplate;
  };
  description: string;
  address: string;
  frozen_token_id: string;
  governance_token_id: string;
  ledgers: {
    holder: {
      address: string;
    };
  }[];
  name: string;
  network: Network;
  period: string;
  staked: string;
  start_time: string;
  token: TokenMetadata;
}

export type FetchedDAO = DAODTO & {
  ledgers: LedgerDTO[];
  proposals: (ProposalDTO & { votes: VoteDTO[] })[];
};
