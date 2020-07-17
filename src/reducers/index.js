import { combineReducers } from "redux";

import add from "./add";
import game from "./game";

const reducers = {
  add,
  game
}


export default combineReducers(reducers);

