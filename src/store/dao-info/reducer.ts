import { createReducer } from "@reduxjs/toolkit";
import { saveDaoInformation } from "./action";

import { TokenHolders } from "./types";

export interface DaoInformation {
  proposal_days: number | undefined;
  proposal_hours: number | undefined;
  proposal_minutes: number | undefined;
  voting_days: number | undefined;
  voting_hours: number | undefined;
  voting_minutes: number | undefined;
  min_stake: number | undefined;
  min_support: number | undefined;
  stake_returned: number | undefined;
  max_agent: number | undefined;
  administrator: string;
  token_name: string | undefined;
  token_symbol: string | undefined;
  lock_disabled: boolean;
  description: string | undefined;
  min_stake_percentage: boolean;
  stake_returned_percentage: boolean;
  token_holders: Array<TokenHolders>;
}

export const initialState: DaoInformation = {
  proposal_days: undefined,
  proposal_hours: undefined,
  proposal_minutes: undefined,
  voting_days: undefined,
  voting_hours: undefined,
  voting_minutes: undefined,
  min_stake: 0,
  min_support: 0,
  stake_returned: 0,
  max_agent: undefined,
  administrator: "",
  token_name: undefined,
  token_symbol: undefined,
  lock_disabled: false,
  description: undefined,
  min_stake_percentage: true,
  stake_returned_percentage: true,
  token_holders: [{ token_holder: "", balance: 0 }],
};

export default createReducer(initialState, (builder) =>
  builder.addCase(saveDaoInformation, (state, action) => {
    state.proposal_days = action.payload.proposal_days;
    state.proposal_hours = action.payload.proposal_hours;
    state.proposal_minutes = action.payload.proposal_minutes;
    state.voting_days = action.payload.voting_days;
    state.voting_hours = action.payload.voting_hours;
    state.voting_minutes = action.payload.voting_minutes;
    state.min_stake = action.payload.min_stake;
    state.min_support = action.payload.min_support;
    state.stake_returned = action.payload.stake_returned;
    state.max_agent = action.payload.max_agent;
    state.administrator = action.payload.administrator;
    state.token_name = action.payload.token_name;
    state.token_symbol = action.payload.token_symbol;
    state.lock_disabled = action.payload.lock_disabled;
    state.description = action.payload.description;
    state.min_stake_percentage = action.payload.min_stake_percentage;
    state.stake_returned_percentage = action.payload.stake_returned_percentage;
    state.token_holders = action.payload.token_holders;
  })
);