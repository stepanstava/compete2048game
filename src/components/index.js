import React, { Component } from "react";
import { connect } from "react-redux";

import Score from "./Score";
import Header from "./Header";
import Board from "./Board";

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
      <div className="container">
        <Score />
        <Header handleNewGameButton={this.handleNewGameButton} />
        <Board handleNewGameButton={this.handleNewGameButton} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, { gameInit: actions.gameInit })(App);
