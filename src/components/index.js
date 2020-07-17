import React, { Component } from "react";
import { connect } from 'react-redux'

import Score from "./Score";
import Header from "./Header";
import Board from "./Board";

// import { increment } from "../actions";

import actions from "../actions";

class App extends Component {

  componentDidMount() {
    // gameInit
    this.props.increment();
  }

  render() {
    console.log(this.props.number);

    return (
      <div className="container">
        <Score />
        <Header />
        <Board />
      </div>
    )
  }
}

const mapStateToProps = state => {
  console.log("state", state)
  return {
    number: state.add.count,
  }
};

export default connect(
  mapStateToProps,
  { increment: actions.increment }
)(App)
