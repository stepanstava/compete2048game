import React, { Component } from "react";
import { connect } from "react-redux";

import Navbar from "./layout/Navbar";

import actions from "../actions";

import Game from "./game";

class Practise extends Component {
  componentDidMount() {
    console.log("cleeer");
    this.props.gameInit(true);
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

const mapStateToProps = state => {
  return {};
};

export default connect(null, {
  gameInit: actions.gameInit,
  removeCompeteMode: actions.removeCompeteMode,
})(Practise);
