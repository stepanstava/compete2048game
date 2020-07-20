import React, { Component } from "react";
import { connect } from "react-redux";

import actions from "../actions";

import Square from "./Square";

// import Score from "./Score";
import { getSquares, shouldBoardMove, isWinning, isLosing } from "../selectors";

class Board extends Component {
  componentDidMount() {
    this.props.addSquare();
    this.props.addSquare();
  }

  renderSquares() {
    const { squares } = this.props;

    return squares.map(square => {
      if (square) {
        const { value, id, posX, posY, merge } = square;

        return (
          <Square
            key={id}
            value={value}
            // indexX={indexX}
            // indexY={indexY}
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
    //!change shouldBoardMove
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

  // tiles are used only as css placeholders for squares
  // !mozna presunout na componentDidMount
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
    return (
      <div className="winning-screen">
        <h2>You won!</h2>
        <button className="btn">Try again</button>
      </div>
    );
  }

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
  isWinning: isWinning(state),
  isLosing: isLosing(state),
});

export default connect(mapStateToProps, {
  moveBoardToRight: actions.moveBoardToRight,
  moveBoardToBottom: actions.moveBoardToBottom,
  moveBoardToTop: actions.moveBoardToTop,
  moveBoardToLeft: actions.moveBoardToLeft,
  moveBoardVertically: actions.moveBoardVertically,
  moveBoardHorizontally: actions.moveBoardHorizontally,
  moveBoardHorizontally2: actions.moveBoardHorizontally2,
  moveBoard: actions.moveBoard,
  addSquare: actions.addSquare,
  updateShouldBoardMove: actions.updateShouldBoardMove,
})(Board);
