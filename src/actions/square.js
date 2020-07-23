import crypto from "crypto";

import { updateBoardMap } from "./board";
import { shouldLoose } from "./game";
import { getBoardMap, isLosing } from "../selectors";
import { cloneBoardMap } from "../utils/board";

// TODO get from store
const SQUARES_ROW = 4;

function getRandomId() {
  return crypto.randomBytes(8).toString("hex");
}

function getRandomSquareCords(boardMap) {
  const posX = Math.floor(Math.random() * SQUARES_ROW);
  const posY = Math.floor(Math.random() * SQUARES_ROW);

  if (boardMap[posX][posY]) {
    return getRandomSquareCords(boardMap);
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

    const newBoardMap = cloneBoardMap(boardMap);
    const { posX, posY } = getRandomSquareCords(boardMap);
    // TODO change to selector
    const doubleSquareProb = getState().game.doubleSquareProb;
    const id = getRandomId();

    const square = {
      id,
      posX,
      posY,
      value: Math.random() > doubleSquareProb ? 2 : 4,
    };

    dispatch({
      type: "ADD_SQUARE",
      square,
    });

    newBoardMap[posX][posY] = square;

    dispatch(updateBoardMap(newBoardMap));

    // TODO game over? - calculate
    // const squaresCount = getState().squares.squaresCount;
    // shouldLoose(squaresCount);
  };
}

export function clearSquares() {
  return (dispatch, getState) => {
    dispatch({
      type: "CLEAR_SQUARES",
    });
  };
}
