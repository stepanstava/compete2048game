import { combineReducers } from "redux";

import game from "./game";
import board from "./board";
import squares from "./squares";

const reducers = {
  game,
  board,
  squares,
}


export default combineReducers(reducers);

