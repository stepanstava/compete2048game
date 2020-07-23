import { isWinning } from "./game";

import { cloneDeep } from "lodash";

const initialState = {
  historyLength: 5,
  undoArr: [],
  redoArr: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "UNDO": {
      // TODO
      // add curent to redoArr
      // current is the last item of undoArr
      const undoArr = state.undoArr;
      const current = undoArr[undoArr.length - 1];

      // removes the last item from undoArr
      const undoArrUpdated = undoArr.slice(0, undoArr.length - 1);

      return {
        ...state,
        undoArr: undoArrUpdated,
        redoArr: [current, ...state.redoArr],
      };
    }

    // TODO
    case "REDO": {
    }

    // TODO
    case "SAVE_STATE": {
      const { currentState } = action;
      const currentStateCopy = cloneDeep(currentState);
      const undoArrUpdated = [...state.undoArr, currentStateCopy];

      return {
        ...state,
        undoArr: undoArrUpdated,
      };
    }

    default:
      return state;
  }
}

// -- Selectors
export function getCurrentState(state) {
  const undoArr = state.history.undoArr;
  return state.history.undoArr[undoArr.length - 1];
}
