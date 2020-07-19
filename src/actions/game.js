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

  };
}
