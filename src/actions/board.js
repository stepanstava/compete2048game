import crypto from "crypto";

import { getBoard, getBoardMap, getEmptyBoardMap, isWinning } from "../selectors";
import { moveBoardHorizontally, moveBoardVertically } from "./boardMove";
// import { compareCondition } from "../utils";

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
  }
}

export function moveBoard(movement) {
  return dispatch => {
    // boardIndex and direction are same for moving:
    // right and down
    // left and top
    const borderIndex = ['top', 'left'].includes(movement) ? 0 : SQUARES_ROW - 1;
    const direction = ['top', 'left'].includes(movement) ? 1 : - 1;

    // move to right or left
    if (['right', 'left'].includes(movement)) {
      dispatch(moveBoardHorizontally(borderIndex, direction));
    } else {
      // move to top or bottom
      dispatch(moveBoardVertically(borderIndex, direction));
    }
   
    
    // move to top
    // move to bottom

  }
}


// case "d":
//   borderIndex = SQUARES_ROW - 1;
//   direction = -1;
//   this.props.moveBoardHorizontally(borderIndex, direction);
//   break;
// case "a":
//   borderIndex = 0;
//   direction = 1;
//   this.props.moveBoardHorizontally(borderIndex, direction);
//   break;
// case "s":
//   borderIndex = SQUARES_ROW - 1;
//   direction = -1;
//   this.props.moveBoardVertically(borderIndex, direction);
//   break;
// case "w":
//   borderIndex = 0;
//   direction = 1;
//   this.props.moveBoardVertically(borderIndex, direction);






