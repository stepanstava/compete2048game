import crypto from "crypto";

import { updateBoardMap } from "./board";
import { shouldLoose } from "./game";
import { getBoardMap, isLosing } from "../selectors";

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
    const newBoardMap = [...boardMap];
    const { posX, posY } = getRandomSquareCords(boardMap);
    // console.log("addSquare -> posY", posX)
    // console.log("addSquare -> posX", posY)

    const id = getRandomId();

    const square = {
      id,
      posX,
      posY,
      value: 2,
    };

    dispatch({
      type: "ADD_SQUARE",
      square,
    });

    newBoardMap[posX][posY] = square;
    // console.log("addSquare -> newBoardMap", newBoardMap)
    //! zmenit na reducer -> posle se cords
    updateBoardMap(newBoardMap);

    //! not done
    const squaresCount = getState().squares.squaresCount;
    shouldLoose(squaresCount);

  };
}

export function clearSquares() {
  return (dispatch, getState) => {
    dispatch({
      type: "CLEAR_SQUARES",
    });

  };
}