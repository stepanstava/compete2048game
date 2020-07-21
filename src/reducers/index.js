import { combineReducers } from "redux";

import game from "./game";
import board from "./board";
import squares from "./squares";
import history from "./history";

const reducers = {
  game,
  board,
  squares,
  history,
}


export default combineReducers(reducers);

