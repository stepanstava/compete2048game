import { resetScore } from "./score";
import { clearBoardMap } from "./board";
import { addSquare, clearSquares } from "./square";
import { saveInitialState, updateGameState } from "./history";

export function gameInit(isNewGame) {
  return (dispatch, getState) => {
    if (!isNewGame) {
      const savedStateLocally = localStorage.getItem("compete2048game");
      if (savedStateLocally) {
        const gameState = JSON.parse(savedStateLocally);
        return dispatch(updateGameState(gameState));
      }
    }

    // reset player score
    dispatch(clearScore());

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
export function clearScore() {
  return dispatch => {
    dispatch({
      type: "CLEAR_SCORE",
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

export function updateBestScore(bestScore) {
  return dispatch => {
    dispatch({
      type: "UPDATE_BEST_SCORE",
      bestScore,
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

export function setKeepPlayingMode() {
  return dispatch => {
    dispatch({
      type: "SET_KEEP_PLAYING",
    });
  };
}
export function loadKeepPlayingMode(keepPlayingMode) {
  return dispatch => {
    dispatch({
      type: "LOAD_KEEP_PLAYING",
      keepPlayingMode,
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
