import { cloneDeep } from "lodash";

import { moveBoardToBottom } from "./down"

//! add to store
const SQUARES_ROW = 4;

const initialState = {
  score: 0,
  shouldBoardMove: true,
  scoreRound: 0,
  isWinning: false,
  isLosing: false,
  goal: 14,
  doubleSquareProb: 0.1,
  moveAnimationDuration: 500,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "ADD_WINNER": {
      return {
        ...state,
        isWinning: true,
        shouldBoardMove: false,
      };
    }
    // score
    case "RESET_SCORE": {
      return {
        ...state,
        score: 0,
      };
    }
    
    case "CLEAR_GAME_STATES": {
      return {
        ...state,
        shouldBoardMove: true,
        isWinning: false,
        isLosing: false,
      };
    }

    case "UPDATE_SCORE": {
      const {score} = action;
      const newScore = state.score + score

      return {
        ...state,
        score: newScore,
      };
    }
    case "UPDATE_SCORE_ROUND": {
      const {scoreRound} = action;

      return {
        ...state,
        scoreRound,
      };
    }

    case "CLEAR_SCORE_ROUND": {
      return {
        ...state,
        scoreRound: 0,
      };
    }

    

    case "UPDATE_SHOULD_MOVE": {
      const { shouldBoardMove } = action;
      return {
        ...state,
        shouldBoardMove,
      };
    }

    default:
      return state;
  }
}

//! prejmenovat na getScore
//! getScoreMap
export function getGameScore(state) {
  return state.game.score;
}

export function getGameScoreRound(state) {
  return state.game.scoreRound;
}

export function shouldBoardMove(state) {
  return state.game.shouldBoardMove;
}

export function isWinningState(state) {
  return state.game.isWinning;
}

export function isLosingState(state) {
  return state.game.isLosing;
}
export function getMoveAnimationDuration(state) {
  return state.game.moveAnimationDuration;
}

// export function getBoard(state) {
//   return state.game.board;
// }

// export function getBoardMap(state) {
//   return state.game.boardMap;
// }

// export function getEmptyBoardMap(state) {
//   const board = [];
//   const { x, y } = state.game.boardDimensions;

//   for (let i = 0; i < x; i++) {
//     const row = new Array(y).fill(null);
//     board.push(row);
//   }
//   return board;
// }

// export function getSquares(state) {
//   return state.game.squares;
// }




// //! add function getScore -> state.board
// function moveBoardToRight(state) {
//   const board = state.board;
//   let temArr = []; // helper temporary array
//   let boardNew = [];

//   const resultBoard = [];

//   // for each row from top to bottom
//   for (let rowIndex = 0; rowIndex < SQUARES_ROW; rowIndex++) {
//     // for each item of row from right to left
//     for (let i = SQUARES_ROW - 1; i >= 0; i--) {
//       // if it's not empty
//       if (board[rowIndex][i]) {
//         temArr.push(board[rowIndex][i]);
//       }
//     }

//     // for each temporary array
//     // for (let temIndex = 0; temIndex < temArr.length; temIndex++) {
//     //   // if two element have same value at consecutive position
//     //   if (
//     //     temIndex < temArr.length - 1 &&
//     //     temArr[temIndex].value === temArr[temIndex + 1].value
//     //   ) {
//     //     // insert only one element as sum of two same element
//     //     temArr[temIndex].value *= 2;
//     //     boardNew.push(temArr[temIndex]);
//     //     temIndex++;
//     //   } else {
//     //     boardNew.push(temArr[temIndex]);
//     //   }
//     // }

//     // filling the each row element to null.
//     // for (let i = 0; i < SQUARES_ROW; i++) {
//     //   board[rowIndex][i] = null;
//     //   i = SQUARES_ROW - 1;
//     // }

//     var newRow = new Array(SQUARES_ROW - temArr.length).fill(null);
//     var reversed = temArr.reverse();
//     resultBoard.push(newRow.concat(reversed));

//     // console.log("board", board);
//     // console.log("row-----", rowIndex);
//     // console.log("temArr", temArr);
//     // console.log("boardNew", boardNew);
//     temArr = [];
//     boardNew = [];
//   }

//   return resultBoard;
// }

// function mergeBoardToRight(state) {
//   const board = state.board;
//   let temArr = []; // helper temporary array
//   let boardNew = [];

//   const resultBoard = [];

//   // for each row from top to bottom
//   for (let rowIndex = 0; rowIndex < SQUARES_ROW; rowIndex++) {
//     // for each item of row from right to left
//     for (let i = SQUARES_ROW - 1; i >= 0; i--) {
//       // if it's not empty
//       if (board[rowIndex][i]) {
//         temArr.push(board[rowIndex][i]);
//       }
//     }

//     // for each temporary array
//     for (let temIndex = 0; temIndex < temArr.length; temIndex++) {
//       // if two element have same value at consecutive position
//       if (
//         temIndex < temArr.length - 1 &&
//         temArr[temIndex].value === temArr[temIndex + 1].value
//       ) {
//         // insert only one element as sum of two same element
//         //!add that momoment hold two
//         // { value: 4 id: x, mergedTo: {value: 2, id: y}}
//         temArr[temIndex + 1].value *= 2;
//         boardNew.push(temArr[temIndex + 1]);
//         temIndex++;
//       } else {
//         boardNew.push(temArr[temIndex]);
//       }
//     }

//     // filling the each row element to null.
//     // for (let i = 0; i < SQUARES_ROW; i++) {
//     //   board[rowIndex][i] = null;
//     //   i = SQUARES_ROW - 1;
//     // }

//     var newRow = new Array(SQUARES_ROW - boardNew.length).fill(null);
//     var reversed = boardNew.reverse();
//     resultBoard.push(newRow.concat(reversed));

//     // console.log("board", board);
//     // console.log("row-----", rowIndex);
//     // console.log("temArr", temArr);
//     // console.log("boardNew", boardNew);
//     temArr = [];
//     boardNew = [];
//   }

//   return resultBoard;
// }

//* backup - working moving to right
// function moveBoardToRight(state) {
//   const board = state.board;
//   let temArr = []; // helper temporary array
//   let boardNew = [];

//   const resultBoard = [];

//   // for each row from top to bottom
//   for (let rowIndex = 0; rowIndex < SQUARES_ROW; rowIndex++) {
//     // for each item of row from right to left
//     for (let i = SQUARES_ROW - 1; i >= 0; i--) {
//       // if it's not empty
//       if (board[rowIndex][i]) {
//         temArr.push(board[rowIndex][i]);
//       }
//     }

//     // for each temporary array
//     for (let temIndex = 0; temIndex < temArr.length; temIndex++) {
//       // if two element have same value at consecutive position
//       if (
//         temIndex < temArr.length - 1 &&
//         temArr[temIndex].value === temArr[temIndex + 1].value
//       ) {
//         // insert only one element as sum of two same element
//         temArr[temIndex].value *= 2;
//         boardNew.push(temArr[temIndex]);
//         temIndex++;
//       } else {
//         boardNew.push(temArr[temIndex]);
//       }
//     }

//     // filling the each row element to null.
//     // for (let i = 0; i < SQUARES_ROW; i++) {
//     //   board[rowIndex][i] = null;
//     //   i = SQUARES_ROW - 1;
//     // }

//     var newRow = new Array(SQUARES_ROW - boardNew.length).fill(null);
//     var reversed = boardNew.reverse();
//     resultBoard.push(newRow.concat(reversed));

//     // console.log("board", board);
//     // console.log("row-----", rowIndex);
//     // console.log("temArr", temArr);
//     // console.log("boardNew", boardNew);
//     temArr = [];
//     boardNew = [];
//   }

//   return resultBoard;
// }
