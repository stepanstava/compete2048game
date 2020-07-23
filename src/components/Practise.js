import React, { Component } from "react";
import { connect } from "react-redux";

import Navbar from "./layout/Navbar";

import Game from "./game";

class Practise extends Component {
  // constructor(props) {
  //   super(props);
  //   this.handleNewGameButton = this.handleNewGameButton.bind(this);
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
