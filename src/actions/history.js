import {
  getSquares,
  getGameScore,
  isWinningState,
  isLosingState,
  getCurrentState,
} from "../selectors";

// TODO
export function undo() {
  return (dispatch, getState) => {
    dispatch({ type: "UNDO" });

    const currectState = getCurrentState(getState());
    const { squares, score, isWinning, isLosing } = currectState;

    dispatch({ type: "UPDATE_SQUARES", squares });
    dispatch({ type: "UPDATE SCORE", score });
  };
}

// TODO
export function redo() {
  return dispatch => {
    dispatch({ type: "REDO" });
  };
}

// TODO
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
