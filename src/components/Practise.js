import React, { Component } from "react";
import { connect } from "react-redux";

import Navbar from "./layout/Navbar";

import Game from "./game";

class Practise extends Component {
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

export default connect(null)(Practise);
