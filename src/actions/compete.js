import { gameInit, updateGameGoal, updateShouldBoardMove } from "./game";
import { updateBoardDimensions } from "./board";

export function setCompeteMode(type, value) {
  
  return (dispatch, getState) => {

    // console.log("setCompeteMode -> type", type, value)

    
    // //!base on selected option
    
    dispatch(toggleCompeteMode());
    // dispatch(updateShouldBoardMove(false));

    if (type === "time") {
      dispatch(updateGameGoal(value));
    }

    if (type === "score") {
      const dimension = {
        rows: value,
        columns: value
      }
      dispatch(updateBoardDimensions(dimension));
    }

    // dispatch(gameInit(true));
    
    // console.log('--------', getState().game.shouldBoardMove)

    // dispatch({
    //   type: "UPDATE_GOAL",
    //   goal,
    // });
    
    
    //!presunout winning screen to Game - index.html

    
    
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

export function removeCompeteMode() {
  return dispatch => {
    dispatch({
      type: "REMOVE_COMPETE",
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
    
    console.log("false")

    dispatch({
      type: "ADD_COUNTDOWN",
    });

    await waitForCountdownToFinish(dispatch);
    // dispatch(startTimer());
    dispatch(updateShouldBoardMove(true));
    console.log("true")
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
