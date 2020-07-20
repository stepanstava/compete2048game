import React, { Component } from "react";
import { connect } from "react-redux";

// import Score from "./Score";

import { getGameScore, getGameScoreRound } from "../selectors";

class Score extends Component {
  renderScoreRound() {
    const { scoreRound } = this.props;
    if (scoreRound > 0) {
      return <span className="points-round">{`+${scoreRound}`}</span>;
    } else {
      return null;
    }
  }

  renderScore() {
    const { score } = this.props;
    return (
      <span className="points">
        {score}
        {this.renderScoreRound()}
      </span>
    );
  }

  render() {
    return (
      <div className="score">
        <span className="title">Score</span>
        {this.renderScore()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  score: getGameScore(state),
  scoreRound: getGameScoreRound(state),
});

export default connect(mapStateToProps)(Score);
