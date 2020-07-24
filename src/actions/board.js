import { getBoard, getBoardQueues, getmoveAnimationDelay } from "../selectors";
import { moveBoardHorizontally, moveBoardVertically } from "./boardMove";
import { updateScore, updateShouldBoardMove, clearRoundScore } from "./game";
import { addSquare } from "./square";
import { saveGameState } from "./history";

// TODO get from store
const SQUARES_ROW = 4;

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
    let borderIndex;
    let direction;

    if (["top", "left"].includes(movement)) {
      borderIndex = 0;
      direction = 1;
    } else {
      borderIndex = SQUARES_ROW - 1;
      direction = -1;
    }

    // blocks pressing another direction when moving
    dispatch(updateShouldBoardMove(false));

    // move board to right or left
    if (["right", "left"].includes(movement)) {
      dispatch(moveBoardHorizontally(borderIndex, direction));
    } else {
      // move to top or bottom
      dispatch(moveBoardVertically(borderIndex, direction));
    }

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

    // saves current game state to history for undo and redo
    dispatch(saveGameState());

    // adds random square
    dispatch(addSquare());
    dispatch(updateShouldBoardMove(true));

    dispatch(clearRound());
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
  
    updatedQue.forEach(square => {
      square.value *= 2;

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
