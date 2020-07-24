import { cloneDeep } from "lodash";
const initialState = {
  boardMap: [],
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
        boardMap: getEmptyBoardMap(rows, columns),
      };
    }

    // case "SET_BOARD_MAP": {
    //   const { rows, columns } = state.boardDimensions;

    //   return {
    //     ...state,
    //     boardMap: getEmptyBoardMap(rows, columns),
    //   };
    // }

    case "UPDATE_BOARD_MAP": {
      const { boardMap } = action;

      return {
        ...state,
        boardMap,
      };
    }
    case "UPDATE_BOARD_DIMENSIONS": {
      const { boardDimensions } = action;

      return {
        ...state,
        boardDimensions: {
          rows: boardDimensions.rows,
          columns: boardDimensions.columns,
        }
      };
    }

    case "UPDATE_QUEUES": {
      const { moveQue, merchedQue, updatedQue } = action.queues;
      return {
        ...state,
        queues: {
          moveQue: [...state.queues.moveQue, ...moveQue],
          merchedQue: [...state.queues.merchedQue, ...merchedQue],
          updatedQue: [...state.queues.updatedQue, ...updatedQue],
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
