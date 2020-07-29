import { resetScore } from "./score";
import { clearBoardMap, updateBoardDimensions, clearQueues } from "./board";
import { addSquare, clearSquares } from "./square";
import {
  saveInitialState,
  updateGameState,
  saveGameState,
  clearHistory,
} from "./history";
import { stopTimer } from "./compete";

import { isSettingsOpen, isTimerRunning, isCompeteMode } from "../selectors";

export function gameInit(isNewGame) {
  return (dispatch, getState) => {
    if (!isNewGame) {
      const savedStateLocally = localStorage.getItem("compete2048game");
      if (savedStateLocally && !isCompeteMode(getState())) {
        const gameState = JSON.parse(savedStateLocally);

        dispatch(updateGameState(gameState));
        // dispatch(saveInitialState(gameState));
        return;
      }
    }

    // reset player score
    dispatch(clearScore());

    // clear board
    dispatch(clearBoardMap());
    dispatch(clearSquares());
    dispatch(clearQueues());

    // clear game states
    dispatch(clearGameStates());

    // draw random square
    dispatch(addSquare());
    dispatch(addSquare());

    // save initial state
    dispatch(clearHistory());
    // dispatch(saveInitialState());
  };
}

export function clearGameStates() {
  return dispatch => {
    dispatch({
      type: "CLEAR_GAME_STATES",
    });
  };
}

export function updateShouldBoardMove(shouldBoardMove) {
  return dispatch => {
    dispatch({
      type: "UPDATE_SHOULD_MOVE",
      shouldBoardMove,
    });
  };
}
export function updateScore(roundScore) {
  return dispatch => {
    dispatch({
      type: "UPDATE_SCORE",
      roundScore,
    });
  };
}
export function clearScore() {
  return dispatch => {
    dispatch({
      type: "CLEAR_SCORE",
    });
  };
}

export function updateIsWinning(isWinning) {
  return (dispatch, getState) => {
    dispatch({
      type: "UPDATE_IS_WINNING",
      isWinning,
    });

    // Stops timer if is running
    if (isTimerRunning(getState())) {
      dispatch(stopTimer());
    }
  };
}
export function updateIsLosing(isLosing) {
  return dispatch => {
    dispatch({
      type: "UPDATE_IS_LOSING",
      isLosing,
    });
  };
}

export function updateGameScore(score) {
  return dispatch => {
    dispatch({
      type: "UPDATE_GAME_SCORE",
      score,
    });
  };
}

export function updateBestScore(bestScore) {
  return dispatch => {
    dispatch({
      type: "UPDATE_BEST_SCORE",
      bestScore,
    });
  };
}

export function clearRoundScore(roundScore) {
  return dispatch => {
    dispatch({
      type: "CLEAR_ROUND_SCORE",
    });
  };
}

export function setKeepPlayingMode() {
  return dispatch => {
    dispatch({
      type: "SET_KEEP_PLAYING",
    });
  };
}
export function loadKeepPlayingMode(keepPlayingMode) {
  return dispatch => {
    dispatch({
      type: "LOAD_KEEP_PLAYING",
      keepPlayingMode,
    });
  };
}

export function toggleSettings() {
  return (dispatch, getState) => {
    dispatch(updateShouldBoardMove(isSettingsOpen(getState())));

    dispatch({
      type: "TOGGLE_SETTINGS",
    });
  };
}

export function closeSettings() {
  return dispatch => {
    dispatch(updateShouldBoardMove(true));

    dispatch({
      type: "CLOSE_SETTINGS",
    });
  };
}
export function updateGameGoal(goal) {
  return dispatch => {
    dispatch({
      type: "UPDATE_GOAL",
      goal,
    });
  };
}

export function updateGameMode(mode) {
  return dispatch => {
    dispatch({
      type: "UPDATE_GAME_MODE",
      mode,
    });
  };
}
