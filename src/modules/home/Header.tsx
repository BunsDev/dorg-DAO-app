import {
  AppBar,
  Box,
  Button,
  Grid,
  Link,
  Theme,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { styled } from "@material-ui/styles";
import HomeButton from "assets/logos/homebase_logo.svg";
import hexToRgba from "hex-to-rgba";
import React from "react";

const StyledAppBar = styled(AppBar)({
  boxShadow: "none",
});

const LogoItem = styled("img")({
  cursor: "pointer",
  paddingTop: 8,
  height: "30px",
});

const LogoText = styled(Typography)({
  fontWeight: "bold",
  fontSize: "24px",
  cursor: "pointer",
  fontFamily: "Roboto",
  letterSpacing: "initial",
});

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  padding: "22px 37px",
  boxSizing: "border-box",
  justifyContent: "space-between",
  flexWrap: "wrap",
});

export const Header: React.FC = () => {
  return (
    <StyledAppBar position="sticky" color="transparent">
      <StyledToolbar>
        <Grid
          container
          direction="row"
          alignItems="center"
          wrap="wrap"
          spacing={4}
          justify="space-between"
        >
          <Grid item>
            <Link href="/landing">
              <Grid container alignItems="center" wrap="nowrap">
                <Grid item>
                  <LogoItem src={HomeButton} />
                </Grid>
                <Grid item>
                  <Box paddingLeft="10px">
                    <LogoText color="textPrimary">Homebase</LogoText>
                  </Box>
                </Grid>
              </Grid>
            </Link>
          </Grid>
          <Grid item>
            <Link href="/explorer" underline="none">
              <Button variant="contained" color="secondary">Enter App</Button>
            </Link>
          </Grid>
        </Grid>
      </StyledToolbar>
    </StyledAppBar>
  );
};
