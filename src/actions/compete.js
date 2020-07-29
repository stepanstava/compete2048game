import { gameInit, updateGameGoal, updateShouldBoardMove } from "./game";

export function setCompeteMode(type) {
  return dispatch => {
    dispatch(gameInit(true));
    dispatch(updateGameGoal(16));

    // dispatch({
    //   type: "UPDATE_GOAL",
    //   goal,
    // });
    //!block playing until countdown
    //!ztmavit background
    //!presunout winning screen to Game - index.html

    dispatch(toggleCompeteMode());
    
    // play countdown
    dispatch(playCountdown());

    // start time
  };
}

export function toggleCompeteMode() {
  return dispatch => {
    dispatch({
      type: "TOGGLE_COMPETE",
    });
  };
}

export function startTimer() {
  return dispatch => {
    // console.log("aaaaaa")
    dispatch({
      type: "START_TIMER",
    });
  };
}

export function stopTimer() {
  return dispatch => {
    // console.log("aaaaaa")
    dispatch({
      type: "STOP_TIMER",
    });
  };
}

export function playCountdown() {
  return async dispatch => {
    dispatch(updateShouldBoardMove(false));

    dispatch({
      type: "ADD_COUNTDOWN",
    });

    await waitForCountdownToFinish(dispatch);
    // dispatch(startTimer());
    dispatch(updateShouldBoardMove(true));
    dispatch(startTimer());
    
  };
}

function waitForCountdownToFinish(dispatch) {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      dispatch({ type: "REMOVE_COUNTDOWN" });
      resolve();
      //!better time tesne nez se objevi ready
    }, 3600);
  });
}
