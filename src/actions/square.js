import crypto from "crypto";

import { updateBoardMap } from "./board";
import { shouldLoose } from "./game";
import {
  getBoardMap,
  isLosing,
  getBoardDimensions,
  getDoubleSquareProb,
  getGameMode
} from "../selectors";
import { cloneBoardMap } from "../utils/board";

function getRandomId() {
  return crypto.randomBytes(8).toString("hex");
}

function getRandomSquareCords(boardMap, rows, columns) {
  const posX = Math.floor(Math.random() * rows);
  const posY = Math.floor(Math.random() * columns);

  if (boardMap[posX][posY]) {
    return getRandomSquareCords(boardMap, rows, columns);
  } else {
    return {
      posX,
      posY,
    };
  }
}

export function addSquare() {
  return (dispatch, getState) => {
    const boardMap = getBoardMap(getState());
    const { rows, columns } = getBoardDimensions(getState());
    const gameMode = getGameMode(getState());

    const newBoardMap = cloneBoardMap(boardMap);
    const { posX, posY } = getRandomSquareCords(boardMap, rows - 1, columns - 1);

    const doubleSquareProb = getDoubleSquareProb(getState());
    const id = getRandomId();

    let squareValue;
    if (gameMode === 2) {
      squareValue = Math.random() > doubleSquareProb ? 2 : 4;
    } else {
      squareValue = Math.random() > doubleSquareProb ? 1 : 2;
    }

    const square = {
      id,
      posX,
      posY,
      value: squareValue
    };

    dispatch({
      type: "ADD_SQUARE",
      square,
    });

    newBoardMap[posX][posY] = square;

    dispatch(updateBoardMap(newBoardMap));
  };
}

export function clearSquares() {
  return (dispatch, getState) => {
    dispatch({
      type: "CLEAR_SQUARES",
    });
  };
}

export function updateSquares(squares) {
  return (dispatch, getState) => {
    dispatch({
      type: "UPDATE_SQUARES",
      squares,
    });
  };
}
