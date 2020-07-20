import { resetScore } from "./score";
import { clearBoardMap } from "./board";
import { addSquare, clearSquares } from "./square";

export function gameInit() {
  return dispatch => {
    // reset player score
    dispatch(resetScore());

    // clear board
    dispatch(clearBoardMap());
    dispatch(clearSquares());

    // draw random square
    dispatch(addSquare());
    dispatch(addSquare());
  };
}

export function updateBoardIsMoving(isBoardMoving) {
  return dispatch => {
    dispatch({
      type: "UPDATE_IS_MOVING",
      isBoardMoving,
    });
  };
}

export function updateScore(scoreRound) {
  return dispatch => {
    console.log("updateScore -> scoreToAdd", scoreRound);

    // update only if the score to add is greater than 0
    if (scoreRound > 0) {
      dispatch({
        type: "UPDATE_SCORE",
        score: scoreRound,
      });

      dispatch({
        type: "UPDATE_SCORE_ROUND",
        scoreRound,
      });

      setTimeout(() => {
        dispatch({
          type: "CLEAR_SCORE_ROUND",
        });
      }, 500);
    }
  };
}
