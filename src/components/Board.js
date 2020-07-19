import React, { Component } from "react";
import { connect } from "react-redux";

import actions from "../actions";

import Square from "./Square";

// import Score from "./Score";
import { getSquares } from "../selectors";

class Board extends Component {
  lastBoard = []

  // componentDidUpdate(prevProp) {
  //   console.log("Board -> componentDidUpdate -> prevProp", prevProp)
  //   const board = prevProp.board;
  //   const flatten = [];

  //   for (let i = 0; i < board.length; i++) {
  //     var row = board[i];
  //     flatten.push(...row);
  //   }

  //   this.lastBoard = flatten;
  // }

  // renderBoard(board) {
  //   const flatten = [];

  //   for (let i = 0; i < board.length; i++) {
  //     var row = board[i];
  //     flatten.push(...row);
  //   }

  //   return flatten.map((square, i) => {
  //     if (square)  {
  //       const { value, id, posX, posY } = square;

  //         return (
  //           <Square
  //             key={id}
  //             value={value}
  //             // indexX={indexX}
  //             // indexY={indexY}
  //             posX={posX}
  //             posY={posY}
  //           />
  //         );



  //     }
  //   });
  // }


  // renderBoard(board) {
  //   const flatten = [];

  //   for (let i = 0; i < board.length; i++) {
  //     var row = board[i];
  //     flatten.push(...row);
  //   }

  //   return flatten.map((square, i) => {
  //     if (square)  {
  //       const { value, id, posX, posY } = square;

  //       return (
  //         <Square
  //           key={id}
  //           value={value}
  //           // indexX={indexX}
  //           // indexY={indexY}
  //           posX={posX}
  //           posY={posY}
  //         />
  //       );
  //     }
  //   });
  // }

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

  renderBoard(squares) {
   
    return squares.map(square => {
      if (square)  {
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
    const SQUARES_ROW = 4;
    let borderIndex;
    let direction;

    switch (e.key) {
      case "d":
        borderIndex = SQUARES_ROW - 1;
        direction = -1;
        this.props.moveBoardHorizontally(borderIndex, direction);
        break;
      case "a":
        borderIndex = 0;
        direction = 1;
        this.props.moveBoardHorizontally(borderIndex, direction);
        break;
      case "s":
        borderIndex = SQUARES_ROW - 1;
        direction = -1;
        this.props.moveBoardVertically(borderIndex, direction);
        break;
      case "w":
        borderIndex = 0;
        direction = 1;
        this.props.moveBoardVertically(borderIndex, direction);
        break;
      default:
        return;
    }
  }

  render() {
    const { squares } = this.props;

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

        {this.renderBoard(squares)}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  squares: getSquares(state),
});

export default connect(mapStateToProps, {
  moveBoardToRight: actions.moveBoardToRight,
  moveBoardToBottom: actions.moveBoardToBottom,
  moveBoardToTop: actions.moveBoardToTop,
  moveBoardToLeft: actions.moveBoardToLeft,
  moveBoardVertically: actions.moveBoardVertically,
  moveBoardHorizontally: actions.moveBoardHorizontally,
})(Board);
