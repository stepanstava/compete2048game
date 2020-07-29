import {
  getBoard,
  getBoardQueues,
  getmoveAnimationDelay,
  getGameGoal,
  isKeepPlayingMode,
  isWinningState,
  getSquares,
  getBoardDimensions,
  getGameMode,
  isCompeteMode,
} from "../selectors";
import { moveBoardHorizontally, moveBoardVertically } from "./boardMove";
import {
  updateScore,
  updateShouldBoardMove,
  clearRoundScore,
  updateIsWinning,
  updateIsLosing,
} from "./game";
import { addSquare } from "./square";
import { saveGameState } from "./history";

export function clearBoardMap() {
  return dispatch => {
    dispatch({ type: "CLEAR_BOARD_MAP" });
  };
}

export function updateBoardMap(boardMap) {
  return dispatch => {
    dispatch({
      type: "UPDATE_BOARD_MAP",
      boardMap,
    });
  };
}

export function moveBoard(movement) {
  return async (dispatch, getState) => {
    const moveAnimationDelay = getmoveAnimationDelay(getState());
    const { rows, columns } = getBoardDimensions(getState());

    if (movement === "top") {
      dispatch(moveBoardVertically(0, 1));
    } else if (movement === "bottom") {
      dispatch(moveBoardVertically(rows - 1, -1));
    } else if (movement === "left") {
      dispatch(moveBoardHorizontally(0, 1));
    } else {
      dispatch(moveBoardHorizontally(columns - 1, -1));
    }

    // blocks pressing another direction when moving
    dispatch(updateShouldBoardMove(false));

    // clears moving queue - moves squares on the board
    const { moveQue } = getBoardQueues(getState());
    if (moveQue.length === 0) {
      dispatch(updateShouldBoardMove(true));
      return;
    }

    dispatch(handleMoveQueue());
    // clears merge queue after moving animation finishes
    await waitForSquareMerge(dispatch, moveAnimationDelay);

    dispatch(handleUpdateQueue());

    // saves current game state to history for undo and redo and to local storage
    if (!isCompeteMode(getState())) {
      dispatch(saveGameState());
    }
    // check for winning square
    dispatch(checkIsWinning());

    dispatch(clearRound());

    // check for game over
    dispatch(checkIsLosing());
  };
}

function checkIsWinning() {
  return (dispatch, getState) => {
    const isWinning = isWinningState(getState());

    if (!isWinning) {
      // adds random square
      dispatch(addSquare());
      dispatch(updateShouldBoardMove(true));
    }
  };
}

function checkIsLosing() {
  return (dispatch, getState) => {
    const squares = getSquares(getState());
    const { rows, columns } = getBoardDimensions(getState());

    if (squares.length === rows * columns) {
      // try to move board it all directions
      dispatch(moveBoardHorizontally(0, 1, false));
      dispatch(moveBoardHorizontally(columns - 1, -1, false));
      dispatch(moveBoardVertically(0, 1, false));
      dispatch(moveBoardVertically(rows - 1, -1, false));

      const { moveQue } = getBoardQueues(getState());

      if (moveQue.length === 0) {
        dispatch(updateShouldBoardMove(false));
        return dispatch(updateIsLosing(true));
      }

      dispatch(clearRound());
    }
  };
}

export function clearRound() {
  return (dispatch, getState) => {
    dispatch(clearQueues());
    dispatch(clearRoundScore());
  };
}

function waitForSquareMerge(dispatch, moveAnimationDelay) {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      dispatch(handleMergedQueue());
      resolve();
    }, moveAnimationDelay);
  });
}

export function updateQueues(moveQue, merchedQue, updatedQue) {
  return (dispatch, getState) => {
    dispatch({
      type: "UPDATE_QUEUES",
      queues: {
        moveQue,
        merchedQue,
        updatedQue,
      },
    });
  };
}

export function handleMoveQueue() {
  return (dispatch, getState) => {
    const { moveQue } = getBoardQueues(getState());

    moveQue.forEach(square => {
      dispatch({
        type: "UPDATE_SQUARE",
        square,
      });
    });
  };
}

export function handleMergedQueue() {
  return (dispatch, getState) => {
    const { merchedQue } = getBoardQueues(getState());

    merchedQue.forEach(square => {
      dispatch({
        type: "REMOVE_SQUARE",
        square,
      });
    });
  };
}

export function handleUpdateQueue() {
  return (dispatch, getState) => {
    const { updatedQue } = getBoardQueues(getState());
    const gameGoal = getGameGoal(getState());
    const keepPlayingMode = isKeepPlayingMode(getState());
    const gameMode = getGameMode(getState());

    updatedQue.forEach(square => {
      if (gameMode === 2) {
        square.value *= 2;
      } else {
        square.value += 1;
      }

      // If square is greater or equal to game goal show winning screen.
      if (!keepPlayingMode && square.value >= gameGoal) {
        dispatch(updateIsWinning(true));
      }

      dispatch({
        type: "UPDATE_SQUARE",
        square,
      });
    });
  };
}

export function clearQueues() {
  return (dispatch, getState) => {
    dispatch({
      type: "CLEAR_QUEUES",
    });
  };
}

export function updateBoardDimensions(boardDimensions) {
  return (dispatch, getState) => {
    dispatch({
      type: "UPDATE_BOARD_DIMENSIONS",
      boardDimensions,
    });
  };
}
