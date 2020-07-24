import React, { Component } from "react";
import { connect } from "react-redux";

import { getGameScore, getGameRoundScore, getBestScore } from "../../selectors";

class Score extends Component {
  renderRoundScore() {
    const { roundScore } = this.props;
    if (roundScore > 0) {
      return <span className="points-round">{`+${roundScore}`}</span>;
    } else {
      return null;
    }
  }

  renderScore() {
    const { score, bestScore, isBestScore } = this.props;
    return (
      <span className="points">
        {isBestScore ? bestScore : score}
        {isBestScore ? null : this.renderRoundScore()}
      </span>
    );
  }
  getScoreTitle() {
    const { isBestScore } = this.props;
    return isBestScore ? "Best" : "Score";
  }

  render() {
    return (
      <div className="score">
        <span className="title">{this.getScoreTitle()}</span>
        {this.renderScore()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  score: getGameScore(state),
  bestScore: getBestScore(state),
  roundScore: getGameRoundScore(state),
});

export default connect(mapStateToProps)(Score);
