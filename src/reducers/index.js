import { combineReducers } from "redux";

import game from "./game";
import board from "./board";
import squares from "./squares";
import history from "./history";
import round from "./round";
import settings from "./settings";
import compete from "./compete";

const reducers = {
  game,
  board,
  squares,
  history,
  round,
  settings,
  compete,
};

export default combineReducers(reducers);
