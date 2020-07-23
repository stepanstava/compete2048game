import {
  getBoard,
  getBoardQueues,
  getMoveAnimationDuration,
} from "../selectors";
import { moveBoardHorizontally, moveBoardVertically } from "./boardMove";
import { updateScore, updateShouldBoardMove } from "./game";
import { addSquare } from "./square";

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
  return (dispatch, getState) => {
    const moveAnimationDuration = getMoveAnimationDuration(getState());

    // TODO change to if
    const borderIndex = ["top", "left"].includes(movement)
      ? 0
      : SQUARES_ROW - 1;
    const direction = ["top", "left"].includes(movement) ? 1 : -1;

    dispatch(updateShouldBoardMove(false));

    // move to right or left
    if (["right", "left"].includes(movement)) {
      dispatch(moveBoardHorizontally(borderIndex, direction));
    } else {
      // move to top or bottom
      dispatch(moveBoardVertically(borderIndex, direction));
    }

    dispatch(clearMoveQue());

    setTimeout(() => {
      dispatch(clearMergedQue());
      const scoreRound = dispatch(clearUpdateQue());

      // TODO better arrangement
      dispatch(addSquare());
      dispatch(updateScore(scoreRound));
      dispatch(updateShouldBoardMove(true));
      dispatch(clearQueues());
    }, moveAnimationDuration);
  };
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

export function clearMoveQue() {
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

export function clearMergedQue() {
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

export function clearUpdateQue() {
  return (dispatch, getState) => {
    const { updatedQue } = getBoardQueues(getState());
    let scoreRound = 0;

    updatedQue.forEach(square => {
      square.value *= 2;
      scoreRound += square.value;

      dispatch({
        type: "UPDATE_SQUARE",
        square,
      });
    });

    return scoreRound;
  };
}

export function clearQueues() {
  return (dispatch, getState) => {
    dispatch({
      type: "CLEAR_QUEUES",
    });
  };
}
