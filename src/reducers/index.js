import { combineReducers } from "redux";

import add from "./add";
import game from "./game";
import board from "./board";
import squares from "./squares";

const reducers = {
  add,
  game,
  board,
  squares,
}


export default combineReducers(reducers);

