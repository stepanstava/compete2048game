import React, { Component } from "react";
import { connect } from "react-redux";

// import Score from "./Score";

import { getGameScore } from "../selectors";


class Score extends Component {

  render() {
    const { score } = this.props;

    return (
      <div className="score">
        <span className="title">Score</span>
      <span className="points">{score}</span>
      </div>
    )
  }
}


const mapStateToProps = state => ({
  score: getGameScore(state),
});

export default connect(mapStateToProps)(Score);