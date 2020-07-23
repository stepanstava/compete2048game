import React, { Component } from "react";
import { connect } from "react-redux";

import { getGameScore, getGameroundScore } from "../../selectors";

class Score extends Component {
  renderroundScore() {
    const { roundScore } = this.props;
    if (roundScore > 0) {
      return <span className="points-round">{`+${roundScore}`}</span>;
    } else {
      return null;
    }
  }

  renderScore() {
    const { score } = this.props;
    return (
      <span className="points">
        {score}
        {this.renderroundScore()}
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
  roundScore: getGameroundScore(state),
});

export default connect(mapStateToProps)(Score);
