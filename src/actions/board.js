import crypto from "crypto";

import { getBoard, getBoardMap, getEmptyBoardMap } from "../selectors";
// import { compareCondition } from "../utils";

const SQUARES_ROW = 4;

export function clearBoard() {
  return dispatch => {
    dispatch({ type: "CLEAR_BOARD_MAP" });
  };
}

export function updateBoardMap(boardMap) {
  return dispatch => {
    dispatch({
      type: "UPDATE_BOARD_MAP",
      boardMap,
    });
  }
}








