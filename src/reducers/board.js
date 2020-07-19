import { moveBoardToBottom } from "./down"

//! add to store
const SQUARES_ROW = 4;

const initialState = {
  boardMap: [
    new Array(4).fill(null),
    new Array(4).fill(null),
    new Array(4).fill(null),
    new Array(4).fill(null),
  ],
  boardDimensions: {
    x: 4,
    y: 4
  }
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "CLEAR_BOARD_MAP": {
      return {
        ...state,
        board: getEmptyBoardMap(state),
      };
    }

    case "UPDATE_BOARD_MAP": {
      const { boardMap } = action;
      return {
        ...state,
        boardMap,
      };
    }

    default:
      return state;
  }
}

// -- Selectors
export function getBoardMap(state) {
  return state.board.boardMap;
}

export function getEmptyBoardMap(state) {
  const board = [];
  const { x, y } = state.board.boardDimensions;

  for (let i = 0; i < x; i++) {
    const row = new Array(y).fill(null);
    board.push(row);
  }
  return board;
}