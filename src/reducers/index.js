import { combineReducers } from "redux";

import game from "./game";
import board from "./board";
import squares from "./squares";
import history from "./history";
import round from "./round";

const reducers = {
  game,
  board,
  squares,
  history,
  round,
};

export default combineReducers(reducers);
