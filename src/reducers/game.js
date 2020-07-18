
import { moveBoardToBottom } from "./down"

//! add to store
const SQUARES_ROW = 4;

const initialState = {
  score: 1,
  board: [
    new Array(4).fill(null),
    new Array(4).fill(null),
    new Array(4).fill(null),
    new Array(4).fill(null),
  ],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "GAME_INIT": {
      return {
        ...state,
        score: 0,
      };
    }
    // score
    case "RESET_SCORE": {
      return {
        ...state,
        score: 0,
      };
    }

    // board
    //!lepsi zpusob
    case "CLEAR_BOARD": {
      return {
        ...state,
        board: [
          new Array(4).fill(null),
          new Array(4).fill(null),
          new Array(4).fill(null),
          new Array(4).fill(null),
        ],
      };
    }

    case "MOVE_RIGHT": {
      return {
        ...state,
        board: moveBoardToRight(state),
      };
    }

    case "MERGE_RIGHT": {
      return {
        ...state,
        board: mergeBoardToRight(state),
      };
    }

    case "MOVE_DOWN": {
      return {
        ...state,
        board: moveBoardToBottom(state),
      };
    }



    // square
    case "ADD_SQUARE": {
      const { indexX, indexY } = action.cords;
      const { id } = action;

      const newBoard = [...state.board];
      //? deep copy lodash ?

      const newRow = [...newBoard[indexX]];
      newBoard[indexX][indexY] = { value: 2, id, posX: indexX,  posY: indexY};
      console.log("newBoard", newBoard);

      return {
        ...state,
        board: newBoard,
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

export function getBoard(state) {
  return state.game.board;
}

//! add function getScore -> state.board
function moveBoardToRight(state) {
  const board = state.board;
  let temArr = []; // helper temporary array
  let boardNew = [];

  const resultBoard = [];

  // for each row from top to bottom
  for (let rowIndex = 0; rowIndex < SQUARES_ROW; rowIndex++) {
    // for each item of row from right to left
    for (let i = SQUARES_ROW - 1; i >= 0; i--) {
      // if it's not empty
      if (board[rowIndex][i]) {
        temArr.push(board[rowIndex][i]);
      }
    }

    // for each temporary array
    // for (let temIndex = 0; temIndex < temArr.length; temIndex++) {
    //   // if two element have same value at consecutive position
    //   if (
    //     temIndex < temArr.length - 1 &&
    //     temArr[temIndex].value === temArr[temIndex + 1].value
    //   ) {
    //     // insert only one element as sum of two same element
    //     temArr[temIndex].value *= 2;
    //     boardNew.push(temArr[temIndex]);
    //     temIndex++;
    //   } else {
    //     boardNew.push(temArr[temIndex]);
    //   }
    // }

    // filling the each row element to null.
    // for (let i = 0; i < SQUARES_ROW; i++) {
    //   board[rowIndex][i] = null;
    //   i = SQUARES_ROW - 1;
    // }

    var newRow = new Array(SQUARES_ROW - temArr.length).fill(null);
    var reversed = temArr.reverse();
    resultBoard.push(newRow.concat(reversed));

    // console.log("board", board);
    // console.log("row-----", rowIndex);
    // console.log("temArr", temArr);
    // console.log("boardNew", boardNew);
    temArr = [];
    boardNew = [];
  }

  return resultBoard;
}

function mergeBoardToRight(state) {
  const board = state.board;
  let temArr = []; // helper temporary array
  let boardNew = [];

  const resultBoard = [];

  // for each row from top to bottom
  for (let rowIndex = 0; rowIndex < SQUARES_ROW; rowIndex++) {
    // for each item of row from right to left
    for (let i = SQUARES_ROW - 1; i >= 0; i--) {
      // if it's not empty
      if (board[rowIndex][i]) {
        temArr.push(board[rowIndex][i]);
      }
    }

    // for each temporary array
    for (let temIndex = 0; temIndex < temArr.length; temIndex++) {
      // if two element have same value at consecutive position
      if (
        temIndex < temArr.length - 1 &&
        temArr[temIndex].value === temArr[temIndex + 1].value
      ) {
        // insert only one element as sum of two same element
        //!add that momoment hold two
        // { value: 4 id: x, mergedTo: {value: 2, id: y}}
        temArr[temIndex + 1].value *= 2;
        boardNew.push(temArr[temIndex + 1]);
        temIndex++;
      } else {
        boardNew.push(temArr[temIndex]);
      }
    }

    // filling the each row element to null.
    // for (let i = 0; i < SQUARES_ROW; i++) {
    //   board[rowIndex][i] = null;
    //   i = SQUARES_ROW - 1;
    // }

    var newRow = new Array(SQUARES_ROW - boardNew.length).fill(null);
    var reversed = boardNew.reverse();
    resultBoard.push(newRow.concat(reversed));

    // console.log("board", board);
    // console.log("row-----", rowIndex);
    // console.log("temArr", temArr);
    // console.log("boardNew", boardNew);
    temArr = [];
    boardNew = [];
  }

  return resultBoard;
}

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
