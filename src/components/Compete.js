import React, { Component } from "react";
import { connect } from "react-redux";

import actions from "../actions";

import Game from "./game";
import Countdown from "./game/Countdown";

import { isCompeteMode, shouldPlayCountdown } from "../selectors";

const COMPETE_VALUES = {
  time: {
    title: [2048, 4096, 8192],
    difficulty: ["Easy", "Medium", "Hard"],
  },
  score: {
    title: ["5x5", "4x4", "3x3"],
    difficulty: ["Easy Grid", "Normal Grid", "Hard Grid"],
  },
};

class Compete extends Component {
  renderOptions(type) {
    return COMPETE_VALUES[type].title.map((item, i) => {
      return (
        <div
          className={`option opt${type === "time" ? i + 1 : i + 4}`}
          onClick={() => this.props.setCompeteMode(item)}
          key={`${type}:${item}`}
        >
          {item}
          <span className="desc">{COMPETE_VALUES[type].difficulty[i]}</span>
        </div>
      );
    });
  }

  renderCompeteBoard() {
    return (
      <div className="compete">
        <div className="item">
          <div className="title">
            <i className="fas fa-stopwatch"></i>
            <h2>Get selected square quickest</h2>
          </div>
          <div className="options">{this.renderOptions("time")}</div>
        </div>
        <div className="item">
          <div className="title">
            <i className="fas fa-trophy"></i>
            <h2>Get the highest score</h2>
          </div>
          <div className="options">{this.renderOptions("score")}</div>
        </div>
      </div>
    );
  }

  renderGame() {
    const {shouldPlayCountdown} = this.props;
    return (
      <div className="content-wrapper">
        <Game />
        {shouldPlayCountdown ? <Countdown /> : null}
      </div>
    );
  }

  render() {
    const { isCompeteMode } = this.props;
    console.log("Compete -> render -> isCompeteMode", isCompeteMode);

    return isCompeteMode ? this.renderGame() : this.renderCompeteBoard();
  }
}

const mapStateToProps = state => {
  return {
    isCompeteMode: isCompeteMode(state),
    shouldPlayCountdown: shouldPlayCountdown(state),
  };
};

export default connect(mapStateToProps, {
  setCompeteMode: actions.setCompeteMode,
})(Compete);
