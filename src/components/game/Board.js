import React, { Component } from "react";
import { connect } from "react-redux";

import actions from "../../actions";

import Square from "./Square";

import {
  getSquares,
  shouldBoardMove,
  isWinningState,
  isLosingState,
} from "../../selectors";

class Board extends Component {
  componentDidMount() {
    // this.props.addSquare();
    // this.props.addSquare();
    this.props.gameInit();
  }

  renderSquares() {
    const { squares } = this.props;

    return squares.map(square => {
      if (square) {
        const { value, id, posX, posY, merge } = square;

        // TODO pass down the whole square object
        return (
          <Square
            key={id}
            value={value}
            posX={posX}
            posY={posY}
            merge={merge}
          />
        );
      }
    });
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

  renderTile(row, column) {
    return <div className="tile" key={`${row}:${column}`}></div>;
  }

  // Tiles are used only as css placeholders for squares.
  // TODO move to componentDidMount ?
  renderTiles() {
    const tiles = [];

    for (let row = 0; row < 4; row++) {
      for (let column = 0; column < 4; column++) {
        tiles.push(this.renderTile(row, column));
      }
    }
    return <div className="tile-container">{tiles}</div>;
  }

  renderWinningScreen() {
    const { handleNewGameButton } = this.props;

    return (
      <div className="winning-screen">
        <h2>You win!</h2>
        <div className="buttons">
          <button className="btn" onClick={() => this.props.setKeepPlayingMode()}>
            Keep playing
          </button>
          <button className="btn" onClick={() => this.props.gameInit(true)}>
            Try again
          </button>
        </div>
      </div>
    );
  }

  // TODO add losing screen
  renderLosingScreen() {}

  render() {
    const { squares, isWinning, isLosing } = this.props;

    return (
      <div
        className="board"
        onKeyDown={e => this.handleKeyDown(e)}
        tabIndex="0"
      >
        <div className="tile-container">{this.renderTiles()}</div>
        <div className="square-container">{this.renderSquares()}</div>
        {isWinning ? this.renderWinningScreen() : null}
        {isLosing ? this.renderLosingScreen() : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  squares: getSquares(state),
  shouldBoardMove: shouldBoardMove(state),
  isWinning: isWinningState(state),
  isLosing: isLosingState(state),
});

export default connect(mapStateToProps, {
  moveBoard: actions.moveBoard,
  addSquare: actions.addSquare,
  gameInit: actions.gameInit,
  setKeepPlayingMode: actions.setKeepPlayingMode,
})(Board);
