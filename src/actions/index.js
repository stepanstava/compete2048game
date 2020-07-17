import * as add from "./add";
import * as game from "./game";
import * as score from "./score";
import * as board from "./board";

export default {
  ...add,
  ...game,
  ...score,
  ...board,
};
