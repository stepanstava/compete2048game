import React, { Component } from "react";
import { connect } from "react-redux";

import actions from "../actions";

import { getLeaderboardResults } from "../selectors";

const MOCK_DATA = [
  { name: "stepan", result: "0:15:35" },
  { name: "john", result: "0:18:38" },
];
const RESULTS_COUNT = 10;
const LEADERBOARDS = {
  time: [2048, 4096, 8192],
  score: ["3x3", "4x4", "5x5"],
};

class Leaderboard extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedBoard: 2048 };
  }

  handleLinkClick(value) {
    this.setState({ selectedBoard: value });
    this.props.fetchResults(value);
  }

  renderLeaderboardNav() {
    return (
      <div className="leaderboard-nav">
        <div className="item">
          <i className="fas fa-stopwatch"></i>
          <div className="title">Best Time</div>
          {this.renderLeaderboardLink("time")}
        </div>

        <div className="item">
          <i className="fas fa-trophy"></i>
          <div className="title">Best Score</div>
          {this.renderLeaderboardLink("score")}
        </div>
      </div>
    );
  }

  renderLeaderboardLink(linkValue) {
    return LEADERBOARDS[linkValue].map(value => {
      if (this.state.selectedBoard === value) {
        return (
          <span
            className="selected"
            onClick={() => this.handleLinkClick(value)}
          >
            {value}
          </span>
        );
      }

      return <span onClick={() => this.handleLinkClick(value)}>{value}</span>;
    });
  }

  renderResult(pos, name, result) {
    return (
      <div className="item">
        <div className="meta">
          <span className="position">{`${pos}.`}</span>
          <span className="name">{name}</span>
        </div>
        <span className="result">{result}</span>
      </div>
    );
  }

  renderEmptyResult() {
    return <div className="item"></div>;
  }

  renderNoResultMessage() {
    return (
      <div className="item">
        <span className="no-results">{"No results yet. Be the first one!"}</span>
      </div>
    );
  }

  renderResults() {
    const { selectedBoard } = this.state;
    const resultsSelectedBoard = this.props.resultsData[selectedBoard];
    const results = [];

    if (resultsSelectedBoard.length === 0) {
      results.push(this.renderNoResultMessage());
    }

    resultsSelectedBoard.forEach((item, i) => {
      const { name, result } = item;
      results.push(this.renderResult(i, name, result));
    });

    const emptyResults = RESULTS_COUNT - results.length;

    for (let i = 0; i < emptyResults; i++) {
      results.push(this.renderEmptyResult());
    }

    return results;
  }

  render() {
    return (
      <div className="leaderboard">
        {this.renderLeaderboardNav()}

        <div className="results">{this.renderResults()}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  resultsData: getLeaderboardResults(state),
});

export default connect(mapStateToProps, {
  // gameInit: actions.gameInit,
  // removeCompeteMode: actions.removeCompeteMode,
  fetchResults: actions.fetchResults,
})(Leaderboard);
