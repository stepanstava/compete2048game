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

    // clear game states
    dispatch(clearGameStates());

    // draw random square
    dispatch(addSquare());
    dispatch(addSquare());
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

export function updateScore(scoreRound) {
  return dispatch => {
    // console.log("updateScore -> scoreToAdd", scoreRound);

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

export function addWinner() {
  return (dispatch, getState) => {
    dispatch({
      type: "ADD_WINNER",
    });
  };
}

export function isLosing() {
  return (dispatch, getState) => {
    dispatch({
      type: "ADD_WINNER",
    });
  };
}

export function shouldLoose(squaresCount) {
  return (dispatch, getState) => {
    if (squaresCount === 16) {
      //isPossibleToMove
      //else
    }
  };
}
