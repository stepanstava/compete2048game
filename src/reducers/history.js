import { isWinning } from "./game";

import { cloneDeep } from "lodash";

const initialState = {
  historyLength: 5,
  undoArr: [
    // {
    //   squares: [],
    //   score: 50
    //   isWinning: false,
    //   isLosing: false
    // }
  ],
  // current: {},
  redoArr: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "UNDO": {
      // add curent to redoArr
      // current is the last item of undoArr
      const undoArr = state.undoArr;
      const current = undoArr[undoArr.length - 1];
      // const previous = undoArr[undoArr.length - 2];


      // removes the last item from undoArr
      const undoArrUpdated = undoArr.slice(0, undoArr.length - 1);
      console.log("undoArrUpdated", undoArrUpdated)
     

      return {
        ...state,
        undoArr: undoArrUpdated,
        redoArr: [current, ...state.redoArr],
      }

    
    }
    case "REDO": {

    }
    case "SAVE_STATE": {
      const { currentState } = action;
      const currentStateCopy = cloneDeep(currentState);
      // console.log("currentStateCopy", currentStateCopy)
      // const squaresCopy = [...currentState.squares];
      const undoArrUpdated = [...state.undoArr, currentStateCopy];
      console.log("undoArrUpdated", undoArrUpdated)

      return {
        ...state,
        undoArr: undoArrUpdated,
      }
    }



    default:
      return state;
  }
}

export function getCurrentState(state) {
  const undoArr = state.history.undoArr;
  return state.history.undoArr[undoArr.length - 1];
}