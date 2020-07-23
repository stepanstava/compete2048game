import { resetScore } from "./score";
import { clearBoardMap } from "./board";
import { addSquare, clearSquares } from "./square";
import { saveInitialState } from "./history";

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

    // save initial state
    dispatch(saveInitialState());
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
export function updateIsWinning(isWinning) {
  return dispatch => {
    dispatch({
      type: "UPDATE_IS_WINNING",
      isWinning,
    });
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

export function clearRoundScore(roundScore) {
  return dispatch => {
    dispatch({
      type: "CLEAR_ROUND_SCORE",
    });
  };
}

// export function updateScore(roundScore) {
//   return dispatch => {
//     // update only if the score to add is greater than 0
//     if (roundScore > 0) {
//       dispatch({
//         type: "UPDATE_SCORE",
//         score: roundScore,
//       });

//       dispatch({
//         type: "UPDATE_SCORE_ROUND",
//         roundScore,
//       });

//       // TODO
//       setTimeout(() => {
//         dispatch({
//           type: "CLEAR_SCORE_ROUND",
//         });
//       }, 500);
//     }
//   };
// }

export function addWinner() {
  return (dispatch, getState) => {
    dispatch({
      type: "ADD_WINNER",
    });
  };
}

export function isLosing() {
  return (dispatch, getState) => {
    // TODO
    // dispatch({
    //   type: "ADD_WINNER",
    // });
  };
}

export function shouldLoose(squaresCount) {
  return (dispatch, getState) => {
    // TODO
    if (squaresCount === 16) {
    }
  };
}
