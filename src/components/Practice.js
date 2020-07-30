import React, { Component } from "react";
import { connect } from "react-redux";

import actions from "../actions";

import Game from "./game";

class Practice extends Component {
  componentDidMount() {
    this.props.loadSettings();
    this.props.gameInit();
    this.props.removeCompeteMode();
  }

  render() {
    return (
      <div className="content-wrapper">
        <Game />
      </div>
    );
  }
}

// const mapStateToProps = state => {
//   return {};
// };

export default connect(null, {
  gameInit: actions.gameInit,
  removeCompeteMode: actions.removeCompeteMode,
  loadSettings: actions.loadSettings,
})(Practice);
