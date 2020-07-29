import React, { Component } from "react";
import { connect } from "react-redux";

import actions from "../../actions";

import Score from "./Score";
import Timer from "./Timer";

import {
  getUndoArr,
  getRedoArr,
  isSettingsOpen,
  isCompeteMode,
  isTimerRunning,
} from "../../selectors";

class Toolbar extends Component {
  // constructor(props) {
  //   super(props);

  // }

  renderScore() {
    const { isCompeteMode } = this.props;

    return (
      <div className="scores">
        <Score isBestScore={false} />
        {!isCompeteMode ? <Score isBestScore={true} /> : null}

        {/* <div className="score">
          <span className="title">Best</span>
          <span className="points">35880</span>
        </div> */}
      </div>
    );
  }

  getHistoryButtonsClassName(isUndo) {
    const { undoArr, redoArr } = this.props;
    let className = "btn";

    if (isUndo && undoArr.length === 0) {
      return (className += " inactive");
    }

    if (!isUndo && redoArr.length === 0) {
      return (className += " inactive");
    }

    return className;
  }

  renderHistoryOptions() {
    return (
      <div className="history">
        <button
          className={this.getHistoryButtonsClassName(true)}
          onClick={() => this.handleHistoryButtonClick(true)}
        >
          <i className="fas fa-undo"></i>
        </button>
        <button
          className={this.getHistoryButtonsClassName(false)}
          onClick={() => this.handleHistoryButtonClick(false)}
        >
          <i className="fas fa-redo"></i>
        </button>
      </div>
    );
  }

  handleHistoryButtonClick(isUndo) {
    const { undoArr, redoArr } = this.props;

    if (isUndo && undoArr.length === 0) {
      return;
    }

    if (!isUndo && redoArr.length === 0) {
      return;
    }

    if (isUndo) {
      this.props.undo();
    } else {
      this.props.redo();
    }
  }

  // toggleSettings() {

  // }
  renderSettingsOrTimer() {
    const { isCompeteMode, isTimerRunning } = this.props;
    if (isCompeteMode) {
      return <Timer isTimerRunning={isTimerRunning}/>;
    } else {
      return (
        <i
          className="fas fa-cog settings"
          onClick={() => this.props.toggleSettings()}
        ></i>
      );
    }
  }

  render() {
    const { isCompeteMode } = this.props;

    return (
      <div className="toolbar">
        <div className="row">
          <button className="btn" onClick={() => this.props.gameInit(true)}>
            New Game
          </button>
          {/* <div class="timer">01:05:23</div> */}
          {this.renderSettingsOrTimer()}
        </div>

        <div className="row">
          {this.renderScore()}
          {!isCompeteMode ? this.renderHistoryOptions() : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  // console.log("state", state)
  return {
    undoArr: getUndoArr(state),
    redoArr: getRedoArr(state),
    isCompeteMode: isCompeteMode(state),
    isTimerRunning: isTimerRunning(state),
  };
};

export default connect(mapStateToProps, {
  gameInit: actions.gameInit,
  undo: actions.undo,
  redo: actions.redo,
  toggleSettings: actions.toggleSettings,
})(Toolbar);
