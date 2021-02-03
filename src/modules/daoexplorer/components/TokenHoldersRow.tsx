import React from "react";
import { Grid, styled, Typography } from "@material-ui/core";
import { TokenHolder } from "../../daocreator/state/types";

const Container = styled(Grid)({
  borderBottom: "1px solid #3D3D3D",
  padding: 2,
});

export const TokenHoldersRow: React.FC<TokenHolder> = ({
  address,
  balance,
}) => {
  return (
    <Container
      container
      direction="row"
      alignItems="center"
      justify="space-between"
    >
      <Grid item xs={6}>
        <Typography variant="body2" color="textSecondary">
          {address
            ? `${address.slice(0, 6)}...${address.slice(
                address.length - 4,
                address.length
              )}`
            : null}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="subtitle1" color="textSecondary" align="right">
          {balance} MGT
        </Typography>
      </Grid>
    </Container>
  );
};