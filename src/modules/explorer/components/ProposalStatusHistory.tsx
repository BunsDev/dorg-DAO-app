import {
  Grid,
  styled,
  Typography,
  useMediaQuery,
  useTheme,
  Tooltip,
} from "@material-ui/core";
import ProgressBar from "react-customizable-progressbar";
import React from "react";
import { StatusBadge } from "./StatusBadge";
import { UserBadge } from "./UserBadge";
import { useParams } from "react-router-dom";
import { formatNumber } from "../utils/FormatNumber";
import { useVotesStats } from "../hooks/useVotesStats";
import { InfoIcon } from "./styled/InfoIcon";
import { BigNumber } from "bignumber.js";
import { useDAO } from "services/indexer/dao/hooks/useDAO";
import { useProposal } from "services/indexer/dao/hooks/useProposal";

const HistoryContent = styled(Grid)({
  paddingBottom: 24,
});

const HistoryItem = styled(Grid)(({ theme }) => ({
  marginTop: 20,
  paddingBottom: 12,
  display: "flex",
  height: "auto",
  [theme.breakpoints.down("sm")]: {
    width: "unset",
  },
}));

const ProgressText = styled(Typography)(
  ({ textColor }: { textColor: string }) => ({
    color: textColor,
    display: "flex",
    alignItems: "center",
    position: "absolute",
    width: "100%",
    height: "100%",
    fontSize: 16,
    userSelect: "none",
    boxShadow: "none",
    background: "inherit",
    fontFamily: "Roboto Mono",
    justifyContent: "center",
    top: 0,
  })
);

const HistoryContainer = styled(Grid)(({ theme }) => ({
  paddingLeft: 53,
  [theme.breakpoints.down("sm")]: {
    padding: "0 20px",
  },
}));

export const ProposalStatusHistory: React.FC = () => {
  const theme = useTheme();

  const { proposalId, id: daoId } = useParams<{
    proposalId: string;
    id: string;
  }>();
  const { data: dao, cycleInfo } = useDAO(daoId);
  const { data: proposal } = useProposal(daoId, proposalId);

  const quorumThreshold = proposal?.quorumThreshold || new BigNumber(0);
  const isMobileSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const { votesQuorumPercentage, votes } = useVotesStats({
    upVotes: proposal?.upVotes || new BigNumber(0),
    downVotes: proposal?.downVotes || new BigNumber(0),
    quorumThreshold,
  });

  return (
    <HistoryContainer item xs={12} md>
      <Grid
        container
        direction={isMobileSmall ? "column" : "row"}
        alignItems="center"
      >
        <HistoryContent item xs={12}>
          <Grid container direction="row">
            <Typography variant="subtitle1" color="textSecondary">
              QUORUM THRESHOLD %
            </Typography>
            <Tooltip
              placement="bottom"
              title={`Amount of ${dao?.data.token.symbol} required to be locked through voting for a proposal to be passed/rejected. ${votes}/${quorumThreshold} votes.`}
            >
              <InfoIcon color="secondary" />
            </Tooltip>
          </Grid>
        </HistoryContent>
        <HistoryContent item xs={12}>
          <ProgressBar
            progress={proposal ? votesQuorumPercentage.toNumber() : 0}
            radius={50}
            strokeWidth={7}
            strokeColor="#3866F9"
            trackStrokeWidth={4}
            trackStrokeColor={theme.palette.primary.light}
          >
            <div className="indicator">
              <ProgressText textColor="#3866F9">
                {proposal ? `${formatNumber(votesQuorumPercentage)}%` : "-"}
              </ProgressText>
            </div>
          </ProgressBar>
        </HistoryContent>
      </Grid>
      <Grid
        container
        direction={isMobileSmall ? "column" : "row"}
        alignItems="center"
      >
        <HistoryContent item xs={12}>
          <Typography variant="subtitle1" color="textSecondary">
            CREATED BY
          </Typography>
        </HistoryContent>
        {proposal && (
          <HistoryContent item xs={12}>
            <UserBadge address={proposal.proposer} full={true} />
          </HistoryContent>
        )}
        <HistoryContent item xs={12}>
          <Typography variant="subtitle1" color="textSecondary">
            HISTORY
          </Typography>
        </HistoryContent>
        {cycleInfo &&
          proposal
            ?.getStatus(cycleInfo.currentLevel)
            .statusHistory.map((item, index) => {
              return (
                <HistoryItem
                  container
                  direction="row"
                  key={index}
                  alignItems="baseline"
                  wrap="nowrap"
                  xs={12}
                >
                  <StatusBadge item xs={3} status={item.status} />
                  <Grid item xs={9}>
                    <Typography color="textSecondary">
                      {item.timestamp}
                    </Typography>
                  </Grid>
                </HistoryItem>
              );
            })}
      </Grid>
    </HistoryContainer>
  );
};
