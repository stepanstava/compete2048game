import { resetScore } from "./score";
import { clearBoard } from "./board";
import { addSquare } from "./square";

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
