import { gameInit, updateGameGoal } from "./game";

export function setCompeteMode(type) {
  return dispatch => {
    
    
    dispatch(gameInit(true));
    dispatch(updateGameGoal(2048))

    // dispatch({
    //   type: "UPDATE_GOAL",
    //   goal,
    // });
    //!block playing until countdown
    //!ztmavit background
    //!presunout winning screen to Game - index.html

    dispatch(toggleCompeteMode());

    // play countdown
    dispatch(playCountdown())

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

export function playCountdown() {
  return async dispatch => {

    dispatch({
      type: "ADD_COUNTDOWN",
    });

    await waitForCountdownToFinish(dispatch);

  };
}

function waitForCountdownToFinish(dispatch) {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      dispatch({type: "REMOVE_COUNTDOWN"});
      resolve();
      //!better time tesne nez se objevi ready
    }, 3500);
  });
}