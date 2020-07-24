import {
  getSquares,
  getGameScore,
  isWinningState,
  isLosingState,
  getCurrentState,
  getPreviousGameState,
  getBoardMap,
  getNextGameState,
} from "../selectors";

import { updateSquares } from "./square";
import { updateBoardMap } from "./board";
import { updateGameScore, updateIsWinning, updateIsLosing } from "./game";

export function undo() {
  return (dispatch, getState) => {
    const gameState = getPreviousGameState(getState());

    dispatch(updateGameState(gameState));

    dispatch({ type: "UNDO" });
  };
}

export function redo() {
  return (dispatch, getState) => {
    const gameState = getNextGameState(getState());

    dispatch(updateGameState(gameState));

    dispatch({ type: "REDO" });
  };
}

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
    const { squares, boardMap, score, isWinning, isLosing } = gameState;
    console.log("updateGameState -> boardMap", boardMap);
    console.log("updateGameState -> squares", squares);

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
        score: 0,
        isWinning: false,
        isLosing: false,
      },
    });
  };
}
