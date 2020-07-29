import React, { Component } from "react";
import { connect } from "react-redux";

import Toolbar from "./Toolbar";
import Board from "./Board";
import Settings from "./Settings";
import Result from "./Result";

import actions from "../../actions";

import {
  isWinningState,
  isLosingState,
  getBoardDimensions,
  isSettingsOpen,
  shouldBoardMove,
  isCompeteMode,
} from "../../selectors";

const SQUARE_WIDTH = {
  3: 125,
  4: 100,
  5: 75,
  6: 60,
};

const GAP_WIDTH = 10;

class Game extends Component {
  constructor(props) {
    super(props);

    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    document.body.addEventListener("keydown", this.handleKeyDown);
    this.props.gameInit();
  }

  componentWillUnmount() {
    document.body.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown(e) {
    e.preventDefault();
    const { moveBoard, shouldBoardMove } = this.props;

    if (shouldBoardMove) {
      switch (e.key.toUpperCase()) {
        // move right
        case "ARROWRIGHT":
          moveBoard("right");
          break;
        case "D":
          moveBoard("right");
          break;
        // move left
        case "ARROWLEFT":
          moveBoard("left");
          break;
        case "A":
          moveBoard("left");
          break;
        // move top
        case "ARROWUP":
          moveBoard("top");
          break;
        case "W":
          moveBoard("top");
          break;
        // move down
        case "ARROWDOWN":
          moveBoard("bottom");
          break;
        case "S":
          moveBoard("bottom");
          break;
        default:
          return;
      }
    }
  }

  getSquareSize() {
    const { rows, columns } = this.props.boardDimensions;
    const larger = Math.max(rows, columns);
    return SQUARE_WIDTH[larger];
  }

  getBoardStyles(squareSize) {
    const { rows, columns } = this.props.boardDimensions;
    const boardWidth =
      rows * squareSize + 2 * GAP_WIDTH + (rows - 1) * GAP_WIDTH;
    const boardHeight =
      columns * squareSize + 2 * GAP_WIDTH + (columns - 1) * GAP_WIDTH;

    return {
      width: boardHeight + "px",
      height: boardWidth + "px",
    };
  }

  renderLosingScreen() {
    return (
      <div className="game-over-screen">
        <h2>Game over!</h2>
        <button className="btn" onClick={() => this.props.gameInit(true)}>
          Try again
        </button>
      </div>
    );
  }
  renderSettingsScreen() {
    return <Settings />;
  }

  renderWinningScreenOptions() {
    const { isCompeteMode } = this.props;

    if (isCompeteMode) {
      return <Result handleKeyDown={this.handleKeyDown} />;
    } else {
      return (
        <div className="buttons">
          <button
            className="btn"
            onClick={() => this.props.setKeepPlayingMode()}
          >
            Keep playing
          </button>
          <button className="btn" onClick={() => this.props.gameInit(true)}>
            Try again
          </button>
        </div>
      );
    }
  }

  renderWinningScreen() {
    return (
      <div className="winning-screen">
        <h2>You win!</h2>
        {this.renderWinningScreenOptions()}
      </div>
    );
  }

  render() {
    const { isWinning, isLosing, isSettingsOpen } = this.props;
    const squareSize = this.getSquareSize();

    return (
      <div className="content">
        <Toolbar />

        <div className="board" style={this.getBoardStyles(squareSize)}>
          <Board squareSize={squareSize} />
          {isWinning ? this.renderWinningScreen() : null}
          {isLosing ? this.renderLosingScreen() : null}
          {isSettingsOpen ? this.renderSettingsScreen() : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isWinning: isWinningState(state),
  isLosing: isLosingState(state),
  isSettingsOpen: isSettingsOpen(state),
  boardDimensions: getBoardDimensions(state),
  shouldBoardMove: shouldBoardMove(state),
  isCompeteMode: isCompeteMode(state),
});

export default connect(mapStateToProps, {
  gameInit: actions.gameInit,
  setKeepPlayingMode: actions.setKeepPlayingMode,
  moveBoard: actions.moveBoard,
})(Game);

