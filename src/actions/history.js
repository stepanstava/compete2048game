import {
  getSquares,
  getGameScore,
  isWinningState,
  isLosingState,
  getCurrentState,
  getLastGameState,
  getBoardMap,
} from "../selectors";

import { updateSquares } from "./square";
import { updateBoardMap } from "./board";
import { updateGameScore, updateIsWinning, updateIsLosing } from "./game";

// TODO
export function undo() {
  return (dispatch, getState) => {
    // dispatch({ type: "UNDO" });
    const gameState = getLastGameState(getState());
    
    dispatch(updateGameState(gameState));

    // const currectState = getCurrentState(getState());
    // const { squares, score, isWinning, isLosing } = currectState;

    // dispatch({ type: "UPDATE_SQUARES", squares });
    // dispatch({ type: "UPDATE SCORE", score });
  };
}

// TODO
export function redo() {
  return dispatch => {
    dispatch({ type: "REDO" });
  };
}

// TODO
export function saveGameState() {
  return (dispatch, getState) => {
    const squares = getSquares(getState());
    const boardMap = getBoardMap(getState());
    const score = getGameScore(getState());
    const isWinning = isWinningState(getState());
    const isLosing = isLosingState(getState());

    dispatch({
      type: "SAVE_STATE",
      gameState: {
        squares,
        boardMap,
        score,
        isWinning,
        isLosing,
      },
    });
  };
}


export function updateGameState(gameState) {
  return (dispatch, getState) => {

    const {squares, boardMap, score, isWinning, isLosing} = gameState;
    console.log("updateGameState -> boardMap", boardMap)
    console.log("updateGameState -> squares", squares)

    dispatch(updateSquares(squares));
    dispatch(updateBoardMap(boardMap));
    dispatch(updateGameScore(score));
    dispatch(updateIsWinning(isWinning));
    dispatch(updateIsLosing(isLosing));



  };
}



export function saveInitialState() {
  return (dispatch, getState) => {
    const squares = getSquares(getState());
    const boardMap = getBoardMap(getState());

    dispatch({
      type: "SAVE_INITIAL_STATE",
      gameState: {
        squares,
        boardMap,
      },
    });
  };
}