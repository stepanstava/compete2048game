import crypto from "crypto";
import { cloneDeep } from "lodash";

import { updateBoardMap } from "./board";
import { shouldLoose } from "./game";
import { getBoardMap, isLosing } from "../selectors";
import { cloneBoardMap } from "../utils/board";

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
    // const newBoardMap = [...boardMap];
    const { posX, posY } = getRandomSquareCords(boardMap);
    const doubleSquareProb = getState().game.doubleSquareProb;
    // console.log("addSquare -> posY", posX)
    // console.log("addSquare -> posX", posY)

    const id = getRandomId();

    const square = {
      id,
      posX,
      posY,
      value: Math.random() > doubleSquareProb ? 2 : 4
    };

    dispatch({
      type: "ADD_SQUARE",
      square,
    });

    newBoardMap[posX][posY] = square;
    // console.log("addSquare -> newBoardMap", newBoardMap)
    //! zmenit na reducer -> posle se cords
    dispatch(updateBoardMap(newBoardMap));

    console.log(getBoardMap(getState()))

    //! not done
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