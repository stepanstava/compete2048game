import { combineReducers } from "redux";

import game from "./game";
import board from "./board";
import squares from "./squares";
import history from "./history";
import settings from "./settings";
import compete from "./compete";
import leaderboard from "./leaderboard";

const reducers = {
  game,
  board,
  squares,
  history,
  settings,
  compete,
  leaderboard,
};

export default combineReducers(reducers);
