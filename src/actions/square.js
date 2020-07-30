import crypto from "crypto";

import { updateBoardMap } from "./board";

import {
  getBoardMap,
  getDoubleSquareProb,
  getGameMode,
} from "../selectors";
import { cloneBoardMap } from "../utils/board";

function getRandomId() {
  return crypto.randomBytes(8).toString("hex");
}

function getAvailableIndexes(boardMap) {
  const indexes = [];

  boardMap.forEach((rows, rowIndex) => {
    rows.forEach((item, itemIndex) => {
      if (!item) {
        indexes.push({ posX: rowIndex, posY: itemIndex });
      }
    });
  });

  return indexes;
}

export function addSquare() {
  return (dispatch, getState) => {
    const boardMap = getBoardMap(getState());
    const newBoardMap = cloneBoardMap(boardMap);
    const doubleSquareProb = getDoubleSquareProb(getState());
    const gameMode = getGameMode(getState());

    const availableIndexes = getAvailableIndexes(boardMap);

    const randomIndex = Math.floor(Math.random() * availableIndexes.length);
    const { posX, posY } = availableIndexes[randomIndex];

    let squareValue;
    if (gameMode === 2) {
      squareValue = Math.random() > doubleSquareProb ? 2 : 4;
    } else {
      squareValue = Math.random() > doubleSquareProb ? 1 : 2;
    }

    const square = {
      id: getRandomId(),
      posX,
      posY,
      value: squareValue,
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
