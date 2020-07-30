import React, { Fragment } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "./layout/Navbar";

import Compete from "./Compete";
import Leaderboard from "./Leaderboard";
import Practice from "./Practice";

export default () => {
  return (
    <Router>
      <Fragment>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Practice} />
          <Route exact path="/compete" component={Compete} />
          <Route exact path="/leaderboard" component={Leaderboard} />
        </Switch>
      </Fragment>
    </Router>
  );
};

