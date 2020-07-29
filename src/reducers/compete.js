const initialState = {
  isCompeteMode: false,
  isHighestScore: false,
  isQuickestTime: false,
  timeGoal: null,
  scoreGoal: null,
  shouldPlayCountdown: false,
  shouldRunTimer: false,
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
    case "ADD_COUNTDOWN": {
      return {
        ...state,
        shouldPlayCountdown: true,
      };
    }
    case "REMOVE_COUNTDOWN": {
      return {
        ...state,
        shouldPlayCountdown: false,
      };
    }
    case "START_TIMER": {
      return {
        ...state,
        shouldRunTimer: true,
      };
    }
    case "STOP_TIMER": {
      return {
        ...state,
        shouldRunTimer: false,
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
export function shouldPlayCountdown(state) {
  return state.compete.shouldPlayCountdown;
}
export function shouldRunTimer(state) {
  return state.compete.shouldRunTimer;
}
// export function getCompeteValues(state) {
//   return state.compete.values;
// }
