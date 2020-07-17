import React, { Component } from "react";
import { connect } from 'react-redux'

import Score from "./Score";
import Header from "./Header";
import Board from "./Board";

import { increment } from "../actions";

class App extends Component {

  componentDidMount() {
    // gameInit
    this.props.increment();
  }

  render() {
    return (
      <div className="container">
        <Score />
        <Header />
        <Board />
      </div>
    )
  }
}

export default connect(
  null,
  { increment }
)(App)