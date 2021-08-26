import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Box, makeStyles, ThemeProvider } from "@material-ui/core";
import { SnackbarProvider } from "notistack";

import { DAOExplorerRouter } from "modules/explorer/router";
import { Navbar } from "modules/common/Toolbar";
import { DAOCreate } from "modules/creator";
import { CreatorProvider } from "modules/creator/state";
import ScrollToTop from "modules/common/ScrollToTop";
import { theme } from "theme";

import "App.css";
import { WarningDialog } from "modules/explorer/components/WarningDialog";
import { TZKTSubscriptionsProvider } from "services/bakingBad/context/TZKTSubscriptions";
import { Landing } from "modules/home/Landing";
import { WarningFooter } from "modules/common/WarningFooter";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 60000),
      retry: false,
      retryOnMount: false,
      refetchOnMount: false,
      refetchOnWindowFocus: true,
      staleTime: 5000,
      cacheTime: 30000,
    },
  },
});

const styles = makeStyles({
  success: {
    backgroundColor: "#4BCF93 !important",
    padding: "6px 28px",
    height: 54,
    fontSize: 13,
    lineHeight: "0px",
    opacity: 1,
  },
  error: {
    backgroundColor: "#ED254E !important",
    padding: "6px 28px",
    height: 54,
    fontSize: 13,
    lineHeight: "0px",
    opacity: 1,
  },
  info: {
    backgroundColor: "#3866F9 !important",
    padding: "6px 28px",
    height: 54,
    fontSize: 13,
    lineHeight: "0px",
    opacity: 1,
  },
});

const App: React.FC = () => {
  const [open, setOpen] = useState(false);
  const classes = styles();

  useEffect(() => {
    const visited = window.localStorage.getItem("homebase:visited");

    if (!visited) {
      setOpen(true);
    }
  }, []);

  const handleClose = () => {
    window.localStorage.setItem("homebase:visited", "true");
    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        classes={{
          variantSuccess: classes.success,
          variantError: classes.error,
          variantInfo: classes.info,
        }}
      >
        <QueryClientProvider client={queryClient}>
          <Box bgcolor="primary.main" position="absolute" width="100%">
            <Router>
              <ScrollToTop />
              <Switch>
                <Route path="/creator">
                  <CreatorProvider>
                    <DAOCreate />
                  </CreatorProvider>
                  <WarningFooter
                    text={
                      "Homebase is highly experimental, and changes are to be expected in the coming weeks. Please use at your own risk. The DAO you ceated will not be deprecated."
                    }
                  />
                </Route>
                <Route path="/explorer">
                  <TZKTSubscriptionsProvider>
                    <Navbar mode="explorer" />
                    <DAOExplorerRouter />
                  </TZKTSubscriptionsProvider>
                  <WarningFooter
                    text={
                      "Homebase is highly experimental, and changes are to be expected in the coming weeks. Please use at your own risk. The DAO you ceated will not be deprecated."
                    }
                  />
                </Route>
                <Route path="/">
                  <Landing />
                </Route>
                <Redirect to="/" />
              </Switch>
            </Router>
          </Box>
          <WarningDialog open={open} handleClose={handleClose} />
        </QueryClientProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
