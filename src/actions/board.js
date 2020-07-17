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
    this.getRandomSquareCords(board);
  }

  return {
    indexX,
    indexY,
  };
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
