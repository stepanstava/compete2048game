import React, { Component } from "react";
import { connect } from "react-redux";

import actions from "../actions";

import Square from "./Square";

// import Score from "./Score";
import { getBoard } from "../selectors";

class Board extends Component {
  renderBoard(board) {
    const flatten = [];

    for (let i = 0; i < board.length; i++) {
      var row = board[i];
      flatten.push(...row);
    }

    console.log("Board -> renderBoard -> flatten", flatten);

    return flatten.map(square => {
      if (square) {
        const { value, id, posX, posY } = square;

        return (
          <Square
            key={id}
            value={value}
            // indexX={indexX}
            // indexY={indexY}
            posX={posX}
            posY={posY}
          />
        );
      }
    });

  }

  // renderBoard(board) {
  //   return board.map((row, indexX) => {
  //     return row.map((square, indexY) => {
  //       if (square) {
  //         const { value, id, posX, posY } = square;
  //         return (
  //           <Square key={id} value={value} indexX={indexX} indexY={indexY} posX={posX} posY={posY} />
  //         );
  //       }
  //       return null;
  //     });
  //   });
  // }

  handleKeyDown(e) {
    switch (e.key) {
      case "d":
        this.props.moveBoardToRight();
        break;
      case "s":
        this.props.moveBoardToBottom();
        break;
      default:
        return;
    }
  }

  render() {
    const { board } = this.props;

    return (
      <div
        className="board"
        onKeyDown={e => this.handleKeyDown(e)}
        tabIndex="0"
      >
        <div className="tile"></div>
        <div className="tile"></div>
        <div className="tile"></div>
        <div className="tile"></div>

        <div className="tile"></div>
        <div className="tile"></div>
        <div className="tile"></div>
        <div className="tile"></div>

        <div className="tile"></div>
        <div className="tile"></div>
        <div className="tile"></div>
        <div className="tile"></div>

        <div className="tile"></div>
        <div className="tile"></div>
        <div className="tile"></div>
        <div className="tile"></div>

        {this.renderBoard(board)}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  board: getBoard(state),
});

export default connect(mapStateToProps, {
  moveBoardToRight: actions.moveBoardToRight,
  moveBoardToBottom: actions.moveBoardToBottom,
})(Board);
