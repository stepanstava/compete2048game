import * as game from "./game";
import * as score from "./score";
import * as board from "./board";
import * as boardMove from "./boardMove";
import * as square from "./square";
import * as history from "./history";
import * as settings from "./settings";
import * as compete from "./compete";

export default {
  ...game,
  ...score,
  ...board,
  ...boardMove,
  ...square,
  ...history,
  ...settings,
  ...compete,
};
