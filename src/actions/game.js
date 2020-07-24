import { resetScore } from "./score";
import { clearBoardMap, updateBoardDimensions } from "./board";
import { addSquare, clearSquares } from "./square";
import { saveInitialState, updateGameState, saveGameState } from "./history";

import { isSettingsOpen } from "../selectors";

export function gameInit(isNewGame) {
  return (dispatch, getState) => {
    if (!isNewGame) {
      const savedStateLocally = localStorage.getItem("compete2048game");
      if (savedStateLocally) {
        const gameState = JSON.parse(savedStateLocally);
        
        dispatch(updateGameState(gameState));
        dispatch(saveInitialState(gameState));
        return;
        // return dispatch(saveInitialState(gameState));
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

export function toggleSettings() {
  return (dispatch, getState) => {

    dispatch(updateShouldBoardMove(isSettingsOpen(getState())));

    dispatch({
      type: "TOGGLE_SETTINGS",
    });
  };
}

export function closeSettings() {
  return dispatch => {
    dispatch(updateShouldBoardMove(true));

    dispatch({
      type: "CLOSE_SETTINGS",
    });
  };
}

export function saveSettings(formData) {
  return dispatch => {
    console.log(formData)

    const {rows, columns, goal, mode} = formData;


    dispatch(updateBoardDimensions({ rows, columns}));

    // dispatch({
    //   type: "CLOSE_SETTINGS",
    // });

    dispatch(closeSettings());

    dispatch(gameInit(true));

    //! close settings
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
