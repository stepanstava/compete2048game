import crypto from "crypto";

import { getBoard } from "../selectors";

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
    const board = getBoard(getState());
    const { indexX, indexY } = getRandomSquareCords(board);

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
export function moveBoardToRight() {
  return (dispatch, getState) => {
    console.log("right");

    dispatch({
      type: "MOVE_RIGHT",
    });

    setTimeout(() => {
      dispatch({
        type: "MERGE_RIGHT",
      });
    }, 50);

    // dispatch({
    //   type: "MERGE_RIGHT",
    // });
  };
}

export function mergeRight() {
  return (dispatch, getState) => {
    console.log("right merge");

    dispatch({
      type: "MERGE_RIGHT",
    });
  };
}

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

export function moveBoardToBottom() {
  return (dispatch,getState) => {
    const board = getBoard(getState());

    const newBoard = [
      new Array(4).fill(null),
      new Array(4).fill(null),
      new Array(4).fill(null),
      new Array(4).fill(null),
    ];

    const helperBoard = [];
    
    const squaresValueUpdated= [];
    const squaresMerged = []

    for (let columnIndex = 0; columnIndex < SQUARES_ROW; columnIndex++) {
      let helperArr = [];

      // for each element of column from bottom to top
      for (let rowIndex = SQUARES_ROW - 1; rowIndex >= 0; rowIndex--) {
        // if item has value
        if (board[rowIndex][columnIndex]) {
          helperArr.push(board[rowIndex][columnIndex]);
        }
      }

      // for each temporary array

      // copying the temporary array to the current column

      for (let i = 0; i < helperArr.length; i++) {
        const item = helperArr[i];
        item.posX = SQUARES_ROW - 1 - i;
        item.posY = columnIndex;
        newBoard[SQUARES_ROW - 1 - i][columnIndex] = item;

        dispatch({
          type: "UPDATE_SQUARE",
          square: item,
        });
      }

      //merge
      for (let i = 0; i < helperArr.length; i++) {
        // if two element have same value at consecutive position
        if (
          i < helperArr.length - 1 &&
          helperArr[i].value === helperArr[i + 1].value
        ) {
          // insert only one element as sum of two same element
          const item = helperArr[i];
          const nextItem = helperArr[i + 1];

          newBoard[nextItem.posX][nextItem.posY] = null;

          nextItem.posX = SQUARES_ROW - 1 - i;
          nextItem.posY = columnIndex;
          nextItem.merge = true;

          //nextItem gets to the postion of the merged item
          dispatch({
            type: "UPDATE_SQUARE",
            square: nextItem,
          });

          squaresValueUpdated.push(item);
          squaresMerged.push(nextItem);

          //updated mainBoard
          // newBoard[SQUARES_ROW - 1 - i][columnIndex] = item;
          // newBoard[SQUARES_ROW - i][columnIndex] = null;  //! mozna chyba

          i++;
          // temArr[temIndex].value *= 2;
          // boardNew.push(temArr[temIndex]);
          // temIndex++;
        } else {
          // boardNew.push(temArr[temIndex]);
        //   const item = helperArr[i];
        //   item.posX = SQUARES_ROW - 1 - i;
        //   item.posY = columnIndex;
        //   dispatch({
        //     type: "UPDATE_SQUARE",
        //     square: item,
        //   });
        //   newBoard[SQUARES_ROW - 1 - i][columnIndex] = item;
        }
      }



      helperBoard.push(helperArr);
    }

    // console.log("moveBoardToBottom -> helperBoard", helperBoard)
    // console.log("moveBoardToBottom -> newBoard", newBoard)

    // const squaresValueUpdated= [];
    // const squaresMerged = []

    setTimeout(() => {


      squaresValueUpdated.forEach(square => {
        const { posX, posY } = square;
        square.value *= 2;
  
        // newBoard[posX][posY].value *= 2;
        // newBoard[posX][posY] = square;
        
        dispatch({
          type: "UPDATE_SQUARE",
          square
        });

        
      })

      squaresMerged.forEach(square => {
        // const { posX, posY } = square;
        // newBoard[posX][posY] = null;

        dispatch({
          type: "REMOVE_SQUARE",
          square
        });
      })
  
  
      // update board
      dispatch({
        type: "UPDATE_BOARD",
        board: newBoard,
        
      });

      console.log("moveBoardToBottom -> newBoard", newBoard);

    }, 500);



  };
}
