import {
  gameInit,
  updateGameGoal,
  updateShouldBoardMove,
  updateGameMode,
} from "./game";
import { updateBoardDimensions } from "./board";

export function setCompeteMode(type, value) {
  return (dispatch, getState) => {
    dispatch(toggleCompeteMode());
    //!not working
    // dispatch(updateShouldBoardMove(false));
    if (type === "time") {
      dispatch(updateGameGoal(value));
    }

    if (type === "score") {
      const dimension = {
        rows: value,
        columns: value,
      };
      dispatch(updateBoardDimensions(dimension));
    }

    dispatch(updateGameMode(2));
    dispatch(playCountdown());
  };
}

export function toggleCompeteMode() {
  return dispatch => {
    dispatch({
      type: "TOGGLE_COMPETE",
    });
  };
}

export function removeCompeteMode() {
  return dispatch => {
    dispatch({
      type: "REMOVE_COMPETE",
    });
  };
}

export function startTimer() {
  return dispatch => {
    dispatch({
      type: "START_TIMER",
    });
  };
}

export function stopTimer() {
  return dispatch => {
    dispatch({
      type: "STOP_TIMER",
    });
  };
}

export function playCountdown() {
  return async dispatch => {
    dispatch({
      type: "ADD_COUNTDOWN",
    });

    await waitForCountdownToFinish(dispatch);

    dispatch(updateShouldBoardMove(true));
    dispatch(startTimer());
  };
}

function waitForCountdownToFinish(dispatch) {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      dispatch({ type: "REMOVE_COUNTDOWN" });
      resolve();
    }, 3600);
  });
}
