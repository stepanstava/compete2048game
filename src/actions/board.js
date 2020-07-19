import crypto from "crypto";

import { getBoard, getBoardMap, getEmptyBoardMap } from "../selectors";

const SQUARES_ROW = 4;

export function clearBoard() {
  return dispatch => {
    dispatch({ type: "CLEAR_BOARD" });
  };
}

function getRandomId() {
  return crypto.randomBytes(8).toString("hex");
}

function getRandomSquareCords(board) {
  const indexX = Math.floor(Math.random() * SQUARES_ROW);
  const indexY = Math.floor(Math.random() * SQUARES_ROW);

  if (board[indexX][indexY]) {
    return getRandomSquareCords(board);
  } else {
    return {
      indexX,
      indexY,
    };
  }
}

export function addSquare() {
  return (dispatch, getState) => {
    const boardMap = getBoardMap(getState());
    const { indexX, indexY } = getRandomSquareCords(boardMap);

    const id = getRandomId();

    dispatch({
      type: "ADD_SQUARE",
      id,
      cords: {
        indexX,
        indexY,
      },
    });

    dispatch({
      type: "UPDATE_SQUARE",
      square: {
        id,
        posX: indexX,
        posY: indexY,
        value: 2,
      },
    });
  };
}

// Moving ----

// Moving ---- Right ->
// export function moveBoardToRight() {
//   return (dispatch, getState) => {
//     console.log("right");

//     dispatch({
//       type: "MOVE_RIGHT",
//     });

//     setTimeout(() => {
//       dispatch({
//         type: "MERGE_RIGHT",
//       });
//     }, 50);

//     // dispatch({
//     //   type: "MERGE_RIGHT",
//     // });
//   };
// }

// export function mergeRight() {
//   return (dispatch, getState) => {
//     console.log("right merge");

//     dispatch({
//       type: "MERGE_RIGHT",
//     });
//   };
// }

// export function moveBoardToBottom() {
//   return (dispatch, getState) => {
//     console.log("down");

//     dispatch({
//       type: "MOVE_DOWN",
//     });

//     // setTimeout(() => {
//     //   dispatch({
//     //     type: "MERGE_RIGHT",
//     //   });
//     // }, 50);

//     // dispatch({
//     //   type: "MERGE_RIGHT",
//     // });

//   }
// }

//! moveBoardToBottom
// export function moveBoardToBottom() {
//   return (dispatch,getState) => {
//     const board = getBoard(getState());

//     const newBoard = [
//       new Array(4).fill(null),
//       new Array(4).fill(null),
//       new Array(4).fill(null),
//       new Array(4).fill(null),
//     ];

//     const helperBoard = [];

//     const squaresValueUpdated= [];
//     const squaresMerged = []

//     for (let columnIndex = 0; columnIndex < SQUARES_ROW; columnIndex++) {
//       let newItemsArr = [];

//       // for each element of column from bottom to top
//       for (let rowIndex = SQUARES_ROW - 1; rowIndex >= 0; rowIndex--) {
//         // if item has value
//         if (board[rowIndex][columnIndex]) {
//           newItemsArr.push(board[rowIndex][columnIndex]);
//         }
//       }

//       // for each temporary array

//       // copying the temporary array to the current column

//       for (let i = 0; i < newItemsArr.length; i++) {
//         const item = newItemsArr[i];
//         item.posX = SQUARES_ROW - 1 - i;
//         item.posY = columnIndex;
//         newBoard[SQUARES_ROW - 1 - i][columnIndex] = item;

//         dispatch({
//           type: "UPDATE_SQUARE",
//           square: item,
//         });
//       }

//       //merge
//       for (let i = 0; i < newItemsArr.length; i++) {
//         // if two element have same value at consecutive position
//         if (
//           i < newItemsArr.length - 1 &&
//           newItemsArr[i].value === newItemsArr[i + 1].value
//         ) {
//           // insert only one element as sum of two same element
//           const item = newItemsArr[i];
//           const nextItem = newItemsArr[i + 1];

//           newBoard[nextItem.posX][nextItem.posY] = null;

//           nextItem.posX = SQUARES_ROW - 1 - i;
//           nextItem.posY = columnIndex;
//           nextItem.merge = true;

//           //nextItem gets to the postion of the merged item
//           dispatch({
//             type: "UPDATE_SQUARE",
//             square: nextItem,
//           });

//           squaresValueUpdated.push(item);
//           squaresMerged.push(nextItem);

//           //updated mainBoard
//           // newBoard[SQUARES_ROW - 1 - i][columnIndex] = item;
//           // newBoard[SQUARES_ROW - i][columnIndex] = null;  //! mozna chyba

//           i++;
//           // temArr[temIndex].value *= 2;
//           // boardNew.push(temArr[temIndex]);
//           // temIndex++;
//         } else {
//           // boardNew.push(temArr[temIndex]);
//         //   const item = newItemsArr[i];
//         //   item.posX = SQUARES_ROW - 1 - i;
//         //   item.posY = columnIndex;
//         //   dispatch({
//         //     type: "UPDATE_SQUARE",
//         //     square: item,
//         //   });
//         //   newBoard[SQUARES_ROW - 1 - i][columnIndex] = item;
//         }
//       }

//       helperBoard.push(newItemsArr);
//     }

//     // console.log("moveBoardToBottom -> helperBoard", helperBoard)
//     // console.log("moveBoardToBottom -> newBoard", newBoard)

//     // const squaresValueUpdated= [];
//     // const squaresMerged = []

//     setTimeout(() => {

//       squaresValueUpdated.forEach(square => {
//         const { posX, posY } = square;
//         square.value *= 2;

//         // newBoard[posX][posY].value *= 2;
//         // newBoard[posX][posY] = square;

//         dispatch({
//           type: "UPDATE_SQUARE",
//           square
//         });

//       })

//       squaresMerged.forEach(square => {
//         // const { posX, posY } = square;
//         // newBoard[posX][posY] = null;

//         dispatch({
//           type: "REMOVE_SQUARE",
//           square
//         });
//       })

//       // update board
//       dispatch({
//         type: "UPDATE_BOARD",
//         board: newBoard,

//       });

//       console.log("moveBoardToBottom -> newBoard", newBoard);

//     }, 500);
//   };
// }

//!----



function buildNewItemsArr(boardMap, direction) {}

function clearQues(dispatch, moveQue, merchedQue, updatedQue, newBoardMap) {
  // clears moving que
  moveQue.forEach(square => {
    dispatch({
      type: "UPDATE_SQUARE",
      square,
    });
  });

  setTimeout(() => {
    // removes merged item from the dom after merge animation
    merchedQue.forEach(square => {
      dispatch({
        type: "REMOVE_SQUARE",
        square,
      });
    });

    // updates value of items that 'was merged' and updated the boardMap
    updatedQue.forEach(square => {
      const { posX, posY } = square;
      square.value *= 2;
      newBoardMap[posX][posY] = square;

      dispatch({
        type: "UPDATE_SQUARE",
        square,
      });
    });
  }, 500);
}




function compareCondition(index, direction) {
  if (direction > 0) {
    return index <  SQUARES_ROW;
  } else {
    return index >= 0;
  }
}

//! VERTICALLY

export function moveBoardVertically(borderIndex, direction) {
  return (dispatch, getState) => {
    const boardMap = getBoardMap(getState());
    const newBoardMap = getEmptyBoardMap(getState());
    const moveQue = [];
    const merchedQue = [];
    const updatedQue = [];

    for (let columnIndex = 0; columnIndex < SQUARES_ROW; columnIndex++) {
      let newItemsArr = [];

      // For each element of column from bottom to top.
      for (let rowIndex = borderIndex; compareCondition(rowIndex, direction); rowIndex += direction) {
        // Skips empty items and creates move array.
        if (boardMap[rowIndex][columnIndex]) {
          newItemsArr.push(boardMap[rowIndex][columnIndex]);
        }
      }

      // Build moving, mergech and updated queues.
      for (let i = 0; i < newItemsArr.length; i++) {
        const newItem = newItemsArr[i];
        const newItemNeighbour = newItemsArr[i + 1];

        // Merges two items if they have same values at consecutive positions
        if (
          newItemNeighbour &&
          newItemsArr[i].value === newItemsArr[i + 1].value
        ) {
          // updates boardMap
          newBoardMap[newItemNeighbour.posX][newItemNeighbour.posY] = null;

          // updates merged item
          newItemNeighbour.posX = Math.abs(borderIndex - i);
          newItemNeighbour.posY = columnIndex;
          newItemNeighbour.merge = true;

          moveQue.push(newItemNeighbour);
          merchedQue.push(newItemNeighbour);
          updatedQue.push(newItem);

          //removes merged item from helper array to make sure that the following items are moving correctly
          newItemsArr.splice(i, 1);
        }

        // updates newItem to it's new position
        newItem.posX = Math.abs(borderIndex - i);
        newItem.posY = columnIndex;

        const mapItem = boardMap[Math.abs(borderIndex - i)][columnIndex];
        // has changed position - moving only in row direction
        if (mapItem === null || newItem.posX !== mapItem.posX) {
          moveQue.push(newItem);
        }

        // updates boardMap
        newBoardMap[Math.abs(borderIndex - i)][columnIndex] = newItem;
      }
    }

    // console.log("moveBoardToBottom -> moveQue", moveQue);
    // console.log("moveBoardToBottom -> merchedQue", merchedQue);
    // console.log("moveBoardToBottom -> updatedQue", updatedQue);

    clearQues(dispatch, moveQue, merchedQue, updatedQue, newBoardMap);

    // finally we can update boardMap
    dispatch({
      type: "UPDATE_BOARD_MAP",
      boardMap: newBoardMap,
    });
    console.log("moveBoardToBottom -> newBoard", newBoardMap);
  };
}


//! HORIZONTALLY
export function moveBoardHorizontally(borderIndex, direction) {
  return (dispatch, getState) => {
    const boardMap = getBoardMap(getState());
    const newBoardMap = getEmptyBoardMap(getState());
    const moveQue = [];
    const merchedQue = [];
    const updatedQue = [];

    for (let rowIndex = 0; rowIndex < SQUARES_ROW; rowIndex++) {
      let newItemsArr = [];

      // For each element of column from bottom to top.
      for (let columnIndex = borderIndex; compareCondition(columnIndex, direction); columnIndex += direction) {
        // Skips empty items and creates move array.
        if (boardMap[rowIndex][columnIndex]) {
          newItemsArr.push(boardMap[rowIndex][columnIndex]);
        }
      }

      // Build moving, mergech and updated queues.
      for (let i = 0; i < newItemsArr.length; i++) {
        const newItem = newItemsArr[i];
        const newItemNeighbour = newItemsArr[i + 1];

        // Merges two items if they have same values at consecutive positions
        if (
          newItemNeighbour &&
          newItemsArr[i].value === newItemsArr[i + 1].value
        ) {
          // updates boardMap
          newBoardMap[newItemNeighbour.posX][newItemNeighbour.posY] = null;

          // updates merged item
          newItemNeighbour.posX = rowIndex;
          newItemNeighbour.posY = Math.abs(borderIndex - i);
          newItemNeighbour.merge = true;

          moveQue.push(newItemNeighbour);
          merchedQue.push(newItemNeighbour);
          updatedQue.push(newItem);

          //removes merged item from helper array to make sure that the following items are moving correctly
          newItemsArr.splice(i, 1);
        }

        // updates newItem to it's new position
        newItem.posX = rowIndex;
        newItem.posY = Math.abs(borderIndex - i);

        const mapItem = boardMap[rowIndex][Math.abs(borderIndex - i)];
        // has changed position - moving only in row direction
        if (mapItem === null || newItem.posY !== mapItem.posY) {
          moveQue.push(newItem);
        }

        // updates boardMap
        newBoardMap[rowIndex][Math.abs(borderIndex - i)] = newItem;
      }
    }

    // console.log("moveBoardToBottom -> moveQue", moveQue);
    // console.log("moveBoardToBottom -> merchedQue", merchedQue);
    // console.log("moveBoardToBottom -> updatedQue", updatedQue);

    clearQues(dispatch, moveQue, merchedQue, updatedQue, newBoardMap);

    // finally we can update boardMap
    dispatch({
      type: "UPDATE_BOARD_MAP",
      boardMap: newBoardMap,
    });
    console.log("moveBoardToBottom -> newBoard", newBoardMap);
  };
}





///
//! DOWN


export function moveBoardToBottom() {
  return (dispatch, getState) => {
    const boardMap = getBoardMap(getState());
    const newBoardMap = getEmptyBoardMap(getState());
    const moveQue = [];
    const merchedQue = [];
    const updatedQue = [];

    for (let columnIndex = 0; columnIndex < SQUARES_ROW; columnIndex++) {
      let newItemsArr = [];

      // For each element of column from bottom to top.
      for (let rowIndex = SQUARES_ROW - 1; rowIndex >= 0; rowIndex--) {
        // Skips empty items and creates move array.
        if (boardMap[rowIndex][columnIndex]) {
          newItemsArr.push(boardMap[rowIndex][columnIndex]);
        }
      }

      // Build moving, mergech and updated queues.
      for (let i = 0; i < newItemsArr.length; i++) {
        const newItem = newItemsArr[i];
        const newItemNeighbour = newItemsArr[i + 1];

        // Merges two items if they have same values at consecutive positions
        if (
          newItemNeighbour &&
          newItemsArr[i].value === newItemsArr[i + 1].value
        ) {
          // updates boardMap
          newBoardMap[newItemNeighbour.posX][newItemNeighbour.posY] = null;

          // updates merged item
          newItemNeighbour.posX = SQUARES_ROW - 1 - i;
          newItemNeighbour.posY = columnIndex;
          newItemNeighbour.merge = true;

          moveQue.push(newItemNeighbour);
          merchedQue.push(newItemNeighbour);
          updatedQue.push(newItem);

          //removes merged item from helper array to make sure that the following items are moving correctly
          newItemsArr.splice(i, 1);
        }

        // updates newItem to it's new position
        newItem.posX = SQUARES_ROW - 1 - i;
        newItem.posY = columnIndex;

        const mapItem = boardMap[SQUARES_ROW - 1 - i][columnIndex];
        // has changed position - moving only in row direction
        if (mapItem === null || newItem.posX !== mapItem.posX) {
          moveQue.push(newItem);
        }

        // updates boardMap
        newBoardMap[SQUARES_ROW - 1 - i][columnIndex] = newItem;
      }
    }

    // console.log("moveBoardToBottom -> moveQue", moveQue);
    // console.log("moveBoardToBottom -> merchedQue", merchedQue);
    // console.log("moveBoardToBottom -> updatedQue", updatedQue);

    clearQues(dispatch, moveQue, merchedQue, updatedQue, newBoardMap);

    // finally we can update boardMap
    dispatch({
      type: "UPDATE_BOARD_MAP",
      boardMap: newBoardMap,
    });
    console.log("moveBoardToBottom -> newBoard", newBoardMap);
  };
}


//! UP

export function moveBoardToTop() {
  return (dispatch, getState) => {
    const boardMap = getBoardMap(getState());
    const newBoardMap = getEmptyBoardMap(getState());
    const moveQue = [];
    const merchedQue = [];
    const updatedQue = [];

    for (let columnIndex = 0; columnIndex < SQUARES_ROW; columnIndex++) {
      let newItemsArr = [];

      // For each element of column from top to bottom.
      for (let rowIndex = 0; rowIndex < SQUARES_ROW; rowIndex++) {
        // Skips empty items and creates move array.
        if (boardMap[rowIndex][columnIndex]) {
          newItemsArr.push(boardMap[rowIndex][columnIndex]);
        }
      }

      // Build moving, mergech and updated queues.
      for (let i = 0; i < newItemsArr.length; i++) {
        const newItem = newItemsArr[i];
        const newItemNeighbour = newItemsArr[i + 1];

        // Merges two items if they have same values at consecutive positions
        if (
          newItemNeighbour &&
          newItemsArr[i].value === newItemsArr[i + 1].value
        ) {
          // updates boardMap
          newBoardMap[newItemNeighbour.posX][newItemNeighbour.posY] = null;

          // updates merged item
          newItemNeighbour.posX = i;
          newItemNeighbour.posY = columnIndex;
          newItemNeighbour.merge = true;

          moveQue.push(newItemNeighbour);
          merchedQue.push(newItemNeighbour);
          updatedQue.push(newItem);

          //removes merged item from helper array to make sure that the following items are moving correctly
          newItemsArr.splice(i, 1);
        }

        // updates newItem to it's new position
        newItem.posX = i;
        newItem.posY = columnIndex;

        const mapItem = boardMap[i][columnIndex];
        // has changed position - moving only in row direction
        if (mapItem === null || newItem.posX !== mapItem.posX) {
          moveQue.push(newItem);
        }

        // updates boardMap
        newBoardMap[i][columnIndex] = newItem;
      }
    }

    // console.log("moveBoardToBottom -> moveQue", moveQue);
    // console.log("moveBoardToBottom -> merchedQue", merchedQue);
    // console.log("moveBoardToBottom -> updatedQue", updatedQue);

    clearQues(dispatch, moveQue, merchedQue, updatedQue, newBoardMap);

    // finally we can update boardMap
    dispatch({
      type: "UPDATE_BOARD_MAP",
      boardMap: newBoardMap,
    });
    console.log("moveBoardToBottom -> newBoard", newBoardMap);
  };
}

//! RIGHT

export function moveBoardToRight() {
  return (dispatch, getState) => {
    const boardMap = getBoardMap(getState());
    const newBoardMap = getEmptyBoardMap(getState());
    const moveQue = [];
    const merchedQue = [];
    const updatedQue = [];

    for (let rowIndex = 0; rowIndex < SQUARES_ROW; rowIndex++) {
      let newItemsArr = [];

      // For each element of column from bottom to top.
      for (let columnIndex = SQUARES_ROW - 1; columnIndex >= 0; columnIndex--) {
        // Skips empty items and creates move array.
        if (boardMap[rowIndex][columnIndex]) {
          newItemsArr.push(boardMap[rowIndex][columnIndex]);
        }
      }

      // Build moving, mergech and updated queues.
      for (let i = 0; i < newItemsArr.length; i++) {
        const newItem = newItemsArr[i];
        const newItemNeighbour = newItemsArr[i + 1];

        // Merges two items if they have same values at consecutive positions
        if (
          newItemNeighbour &&
          newItemsArr[i].value === newItemsArr[i + 1].value
        ) {
          // updates boardMap
          newBoardMap[newItemNeighbour.posX][newItemNeighbour.posY] = null;

          // updates merged item
          newItemNeighbour.posX = rowIndex;
          newItemNeighbour.posY = SQUARES_ROW - 1 - i;
          newItemNeighbour.merge = true;

          moveQue.push(newItemNeighbour);
          merchedQue.push(newItemNeighbour);
          updatedQue.push(newItem);

          //removes merged item from helper array to make sure that the following items are moving correctly
          newItemsArr.splice(i, 1);
        }

        // updates newItem to it's new position
        newItem.posX = rowIndex;
        newItem.posY = SQUARES_ROW - 1 - i;

        const mapItem = boardMap[rowIndex][SQUARES_ROW - 1 - i];
        // has changed position - moving only in row direction
        if (mapItem === null || newItem.posY !== mapItem.posY) {
          moveQue.push(newItem);
        }

        // updates boardMap
        newBoardMap[rowIndex][SQUARES_ROW - 1 - i] = newItem;
      }
    }

    // console.log("moveBoardToBottom -> moveQue", moveQue);
    // console.log("moveBoardToBottom -> merchedQue", merchedQue);
    // console.log("moveBoardToBottom -> updatedQue", updatedQue);

    clearQues(dispatch, moveQue, merchedQue, updatedQue, newBoardMap);

    // finally we can update boardMap
    dispatch({
      type: "UPDATE_BOARD_MAP",
      boardMap: newBoardMap,
    });
    console.log("moveBoardToBottom -> newBoard", newBoardMap);
  };
}

// !LEFT

export function moveBoardToLeft() {
  return (dispatch, getState) => {
    const boardMap = getBoardMap(getState());
    const newBoardMap = getEmptyBoardMap(getState());
    const moveQue = [];
    const merchedQue = [];
    const updatedQue = [];

    for (let rowIndex = 0; rowIndex < SQUARES_ROW; rowIndex++) {
      let newItemsArr = [];

      // For each element of column from bottom to top.
      for (let columnIndex = 0; columnIndex < SQUARES_ROW; columnIndex++) {
        // Skips empty items and creates move array.
        if (boardMap[rowIndex][columnIndex]) {
          newItemsArr.push(boardMap[rowIndex][columnIndex]);
        }
      }

      // Build moving, mergech and updated queues.
      for (let i = 0; i < newItemsArr.length; i++) {
        const newItem = newItemsArr[i];
        const newItemNeighbour = newItemsArr[i + 1];

        // Merges two items if they have same values at consecutive positions
        if (
          newItemNeighbour &&
          newItemsArr[i].value === newItemsArr[i + 1].value
        ) {
          // updates boardMap
          newBoardMap[newItemNeighbour.posX][newItemNeighbour.posY] = null;

          // updates merged item
          newItemNeighbour.posX = rowIndex;
          newItemNeighbour.posY = i;
          newItemNeighbour.merge = true;

          moveQue.push(newItemNeighbour);
          merchedQue.push(newItemNeighbour);
          updatedQue.push(newItem);

          //removes merged item from helper array to make sure that the following items are moving correctly
          newItemsArr.splice(i, 1);
        }

        // updates newItem to it's new position
        newItem.posX = rowIndex;
        newItem.posY = i;

        const mapItem = boardMap[rowIndex][i];
        // has changed position - moving only in row direction
        if (mapItem === null || newItem.posY !== mapItem.posY) {
          moveQue.push(newItem);
        }

        // updates boardMap
        newBoardMap[rowIndex][i] = newItem;
      }
    }

    // console.log("moveBoardToBottom -> moveQue", moveQue);
    // console.log("moveBoardToBottom -> merchedQue", merchedQue);
    // console.log("moveBoardToBottom -> updatedQue", updatedQue);

    clearQues(dispatch, moveQue, merchedQue, updatedQue, newBoardMap);

    // finally we can update boardMap
    dispatch({
      type: "UPDATE_BOARD_MAP",
      boardMap: newBoardMap,
    });
    console.log("moveBoardToBottom -> newBoard", newBoardMap);
  };
}