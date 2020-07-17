const initialState = {
  score: 1,
  board: [
    new Array(4).fill(null),
    new Array(4).fill(null),
    new Array(4).fill(null),
    new Array(4).fill(null),
  ],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "GAME_INIT": {
      return {
        ...state,
        score: 0,
      };
    }
    // score
    case "RESET_SCORE": {
      return {
        ...state,
        score: 0,
      };
    }

    // board
    //!lepsi zpusob
    case "CLEAR_BOARD": {
      return {
        ...state,
        board: [
          new Array(4).fill(null),
          new Array(4).fill(null),
          new Array(4).fill(null),
          new Array(4).fill(null),
        ],
      };
    }

    // square
    case "ADD_SQUARE": {
      const { indexX, indexY } = action.cords;
      const { id } = action;

      const newBoard = [...state.board];
      //? deep copy lodash ?

      const newRow = [...newBoard[indexX]];
      newBoard[indexX][indexY] = { value: 2, id };
      console.log("newBoard", newBoard);

      return {
        ...state,
        board: newBoard,
      };
    }

    default:
      return state;
  }
}

//! prejmenovat na getScore
export function getGameScore(state) {
  return state.game.score;
}

export function getBoard(state) {
  return state.game.board;
}
