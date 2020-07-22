import {
  getSquares,
  getGameScore,
  isWinningState,
  isLosingState,
  getCurrentState,
} from "../selectors";

export function undo() {
  return (dispatch, getState) => {
    dispatch({ type: "UNDO" });

    //get current state
    const currectState = getCurrentState(getState());
    // console.log("undo -> currectState", currectState);
    // "UPDATE SQUARES"
    const { squares, score, isWinning, isLosing } = currectState;

    dispatch({ type: "UPDATE_SQUARES", squares });
    dispatch({ type: "UPDATE SCORE", score });
    // "UPDATE SCORE"
    // "UPDATE WINNING"
    // "UPDATE LOOSING"
  };
}

export function redo() {
  return dispatch => {
    dispatch({ type: "REDO" });
  };
}

export function saveCurrentState() {
  return (dispatch, getState) => {
    const squares = getSquares(getState());
    const score = getGameScore(getState());
    const isWinning = isWinningState(getState());
    const isLosing = isLosingState(getState());

    dispatch({
      type: "SAVE_STATE",
      currentState: {
        squares,
        score,
        isWinning,
        isLosing,
      },
    });
  };
}
