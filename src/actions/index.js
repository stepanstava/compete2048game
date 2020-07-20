import * as game from "./game";
import * as score from "./score";
import * as board from "./board";
import * as boardMove from "./boardMove";
import * as square from "./square";

export default {
  ...game,
  ...score,
  ...board,
  ...boardMove,
  ...square,
};
