import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import React from "react";

import { DAOsList } from "../modules/daoexplorer/pages/List";
import { DAO } from "../modules/daoexplorer/pages/DAO";
import { Treasury } from "../modules/daoexplorer/pages/Treasury";
import { Proposals } from "../modules/daoexplorer/pages/Proposals";
import { Voting } from "../modules/daoexplorer/pages/Voting";

export const DAOExplorerRouter = (): JSX.Element => {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route path={`${match.url}/daos`}>
        <DAOsList />
      </Route>
      <Route path={`${match.url}/dao/:id/proposal/:proposalId`}>
        <Voting />
      </Route>
      <Route path={`${match.url}/dao/:id`}>
        <DAO />
      </Route>
      <Route path={`${match.url}/proposals/:id`}>
        <Proposals />
      </Route>
      <Route path={`${match.url}/treasury/:id`}>
        <Treasury />
      </Route>
      <Redirect to={`${match.url}/daos`} />
    </Switch>
  );
};
