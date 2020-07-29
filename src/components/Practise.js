import React, { Component } from "react";
import { connect } from "react-redux";

import Navbar from "./layout/Navbar";

import actions from "../actions";

import Game from "./game";

class Practise extends Component {
  componentDidMount() {
    // const grid = {
    //   rows: 4,
    //   columns: 4
    // }
    // this.props.updateBoardDimensions(grid);
    this.props.gameInit();
    this.props.removeCompeteMode();
    this.props.loadSettings();
    
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
  updateBoardDimensions: actions.updateBoardDimensions,
  loadSettings: actions.loadSettings,
})(Practise);
