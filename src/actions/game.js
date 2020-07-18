import { resetScore } from "./score";
import { clearBoard, addSquare } from "./board";

export function gameInit() {
  return dispatch => {

    // reset player score
    dispatch(resetScore());

    // clear board
    //!nefunguje
    // dispatch(clearBoard());

    // draw random square
    dispatch(addSquare());

  };
}
