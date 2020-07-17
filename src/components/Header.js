// !button to own class - shared

import React, { Component } from "react";
import { connect } from "react-redux";

// import Score from "./Score";

import actions from "../actions";

class Header extends Component {
  render() {
    return (
      <div className="header">
        <button className="btn" onClick={() => this.props.gameInit()}>
          New Game
        </button>
      </div>
    );
  }
}

export default connect(null, { gameInit: actions.gameInit })(Header);
