import { cloneDeep } from "lodash";
const initialState = {
  boardMap: [
    new Array(4).fill(null),
    new Array(4).fill(null),
    new Array(4).fill(null),
    new Array(4).fill(null),
  ],
  boardDimensions: {
    rows: 4,
    columns: 4,
  },
  queues: {
    moveQue: [],
    merchedQue: [],
    updatedQue: [],
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "CLEAR_BOARD_MAP": {
      const { rows, columns } = state.boardDimensions;

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

    case "UPDATE_QUEUES": {
      const { moveQue, merchedQue, updatedQue } = action.queues;
      return {
        ...state,
        queues: {
          moveQue,
          merchedQue,
          updatedQue,
        },
      };
    }

    case "CLEAR_QUEUES": {
      return {
        ...state,
        queues: {
          moveQue: [],
          merchedQue: [],
          updatedQue: [],
        },
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
export function getBoardDimensions(state) {
  return state.board.boardDimensions;
}

export function getBoardQueues(state) {
  return state.board.queues;
}

export function getEmptyBoardMap(rows, columns) {
  const board = [];

  for (let i = 0; i < rows; i++) {
    const row = new Array(columns).fill(null);
    board.push(row);
  }
  return board;
}
