const initialState = {
  isCompeteMode: false,
  isHighestScore: false,
  isQuickestTime: false,
  timeGoal: null,
  scoreGoal: null,

};

export default function (state = initialState, action) {
  switch (action.type) {
    // case "SAVE_OPTION": {
    //   const { selectName, value } = action;

    //   return {
    //     ...state,
    //     selectedOptions: {
    //       ...state.selectedOptions,
    //       [selectName]: value,
    //     },
    //   };
    // }

    case "TOGGLE_COMPETE": {
      return {
        ...state,
        isCompeteMode: !state.isCompeteMode,
      };
    }



    default:
      return state;
  }
}

// -- Selectors
export function isCompeteMode(state) {
  return state.compete.isCompeteMode;
}
// export function getCompeteValues(state) {
//   return state.compete.values;
// }
