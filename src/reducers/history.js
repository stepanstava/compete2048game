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
      // TODO
      // add curent to redoArr
      // current is the last item of undoArr
      // const undoArr = state.undoArr;
      // const current = undoArr[undoArr.length - 1];

      // // removes the last item from undoArr
      // const undoArrUpdated = undoArr.slice(0, undoArr.length - 1);

      // return {
      //   ...state,
      //   undoArr: undoArrUpdated,
      //   redoArr: [current, ...state.redoArr],
      // };
    }

    // TODO
    case "REDO": {
    }
    case "SAVE_INITIAL_STATE": {
      const { gameState } = action;

      return {
        ...state,
        current: gameState,
      };
    }


    // TODO
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
      };
    }

    default:
      return state;
  }
}

// -- Selectors
// export function getCurrentState(state) {
//   const undoArr = state.history.undoArr;
//   return state.history.undoArr[undoArr.length - 1];
// }

export function getLastGameState(state) {
  const undoArr = state.history.undoArr;
  return state.history.undoArr[undoArr.length - 1];
}
