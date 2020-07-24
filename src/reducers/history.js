import { isWinning } from "./game";

import { cloneDeep } from "lodash";

const initialState = {
  historyLength: 5,
  undoArr: [],
  current: {},
  redoArr: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "UNDO": {
      const undoArrUpdated = cloneDeep(state.undoArr);
      const requestedState = undoArrUpdated.pop();

      return {
        ...state,
        undoArr: undoArrUpdated,
        current: requestedState,
        redoArr: [state.current, ...state.redoArr],
      };
    }
    case "REDO": {
      const redoArrUpdated = cloneDeep(state.redoArr);
      const requestedState = redoArrUpdated.shift();

      return {
        ...state,
        undoArr: [...state.undoArr, state.current],
        current: requestedState,
        redoArr: redoArrUpdated,
      };
    }

    case "SAVE_INITIAL_STATE": {
      const { gameState } = action;

      return {
        ...state,
        current: gameState,
        undoArr: [],
        redoArr: [],
      };
    }

    case "SAVE_STATE": {
      const { gameState } = action;
      const undoArr = state.undoArr;
      const lastState = state.current;

      const undoArrUpdated = cloneDeep(undoArr);
      if (undoArrUpdated.length === state.historyLength) {
        undoArrUpdated.shift();
      }

      return {
        ...state,
        undoArr: [...undoArrUpdated, lastState],
        current: gameState,
        redoArr: [],
      };
    }

    default:
      return state;
  }
}

// -- Selectors
export function getPreviousGameState(state) {
  const undoArr = state.history.undoArr;
  return undoArr[undoArr.length - 1];
}

export function getNextGameState(state) {
  return state.history.redoArr[0];
}

export function getUndoArr(state) {
  return state.history.undoArr;
}

export function getRedoArr(state) {
  return state.history.redoArr;
}
