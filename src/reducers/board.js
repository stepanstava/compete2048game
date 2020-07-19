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
    rows: 4,
    columns: 4
  }
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "CLEAR_BOARD_MAP": {
      const {rows, columns} = state.boardDimensions;

      return {
        ...state,
        board: getEmptyBoardMap(rows, columns),
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

export function getEmptyBoardMap(rows, columns) {
  const board = [];

  for (let i = 0; i < rows; i++) {
    const row = new Array(columns).fill(null);
    board.push(row);
  }
  return board;
}