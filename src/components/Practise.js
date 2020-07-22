import React, { Component } from "react"
import { connect } from "react-redux";

import Navbar from "./layout/Navbar";
//! upravit
import Game from "./game";

// import actions from "../actions";



class Practise extends Component {
  // constructor(props) {
  //   super(props);
  //   this.handleNewGameButton = this.handleNewGameButton.bind(this);
  // }

  // handleNewGameButton() {
  //   this.props.gameInit();
  // }

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

export default connect(mapStateToProps)(Practise);