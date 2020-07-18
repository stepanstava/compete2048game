import crypto from "crypto";

import { getBoard } from "../selectors";

const SQUARES_ROW = 4;

export function clearBoard() {
  return dispatch => {
    dispatch({ type: "CLEAR_BOARD" });
  };
}

function getRandomId() {
  return crypto.randomBytes(8).toString('hex');
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

    dispatch({
      type: "ADD_SQUARE",
      id: getRandomId(),
      cords: {
        indexX,
        indexY,
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


  }
}

export function mergeRight() {
  return (dispatch, getState) => {
    console.log("right merge");

    dispatch({
      type: "MERGE_RIGHT",
    });

  }
}


export function moveBoardToBottom() {
  return (dispatch, getState) => {
    console.log("down");

    dispatch({
      type: "MOVE_DOWN",
    });

    // setTimeout(() => {
    //   dispatch({
    //     type: "MERGE_RIGHT",
    //   });
    // }, 50);

    // dispatch({
    //   type: "MERGE_RIGHT",
    // });


  }
}