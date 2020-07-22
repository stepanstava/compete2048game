import React, { Fragment, Component } from "react";
import { connect } from "react-redux";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// import Score from "./Score";
// import Header from "./Header";
// import Board from "./Board";
import Navbar from "./layout/Navbar";

import Compete from "./Compete";
import Highscore from "./Highscore";
import Practise from "./Practise";

// import { increment } from "../actions";

import actions from "../actions";

class App extends Component {
  constructor(props) {
    super(props);
    this.handleNewGameButton = this.handleNewGameButton.bind(this);
  }

  handleNewGameButton() {
    this.props.gameInit();
  }

  render() {
    return (
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Practise} />
            <Route exact path="/compete" component={Compete} />
            <Route exact path="/highscore" component={Highscore} />
          </Switch>
        </Fragment>
      </Router>

      // <Fragment>
      //   <Switch>
      //     <Route path="/compete">
      //       <Compete />
      //     </Route>
      //     <Route path="/highscore">
      //       <Highscore />
      //     </Route>
      //     <Route path="/">
      //       <Practise />
      //     </Route>
      //   </Switch>
      // </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, { gameInit: actions.gameInit })(App);
