import { gameInit, updateGameGoal } from "./game";

export function setCompeteMode(type) {
  return dispatch => {
    
    
    dispatch(gameInit(true));
    dispatch(updateGameGoal(2048))

    // dispatch({
    //   type: "UPDATE_GOAL",
    //   goal,
    // });


    dispatch(toggleCompeteMode());

  };
}

export function toggleCompeteMode() {
  return dispatch => {
        dispatch({
      type: "TOGGLE_COMPETE",
    });
  };
}