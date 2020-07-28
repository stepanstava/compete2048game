import React, { Fragment, Component } from "react";
import { connect } from "react-redux";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "./layout/Navbar";

import Compete from "./Compete";
import Leaderboard from "./Leaderboard";
import Practise from "./Practise";

import actions from "../actions";

class App extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Practise} />
            <Route exact path="/compete" component={Compete} />
            <Route exact path="/leaderboard" component={Leaderboard} />
          </Switch>
        </Fragment>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(null)(App);
