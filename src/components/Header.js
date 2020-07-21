// !button to own class - shared

import React, { Component } from "react";
import { connect } from "react-redux";

// import Score from "./Score";

import actions from "../actions";

class Header extends Component {
  render() {
    const { handleNewGameButton } = this.props;

    return (
      <div className="header">
        <button className="btn" onClick={() => this.props.undo()}>
          Undo
        </button>
        <button className="btn" onClick={() => this.props.redo()}>
          Redo
        </button>

        <button className="btn" onClick={() => handleNewGameButton()}>
          New Game
        </button>
      </div>
    );
  }
}

export default connect(null, {
  gameInit: actions.gameInit,
  undo: actions.undo,
  redo: actions.redo,
})(Header);
