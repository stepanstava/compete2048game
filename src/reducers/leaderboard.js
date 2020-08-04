const initialState = {
  selectedBoard: 2048,
  results: {
    2048: [],
    4096: [
      { name: "stepan", result: "0:15:35" },
      { name: "john", result: "0:18:38" },
    ],
    8192: [],
    "3x3": [],
    "4x4": [],
    "5x5": [],
  },
  isLoading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "ADD_RESULTS": {
      const { results, competition } = action;

      return {
        ...state,
        results: {
          ...state.results,
          [competition]: getTopTenResults(results),
        },
      };
    }

    case "SET_LOADING": {
      return {
        ...state,
        isLoading: true,
      };
    }

    case "REMOVE_LOADING": {
      return {
        ...state,
        isLoading: false,
      };
    }

    default:
      return state;
  }
}

function getTopTenResults(results) {
  const sorted = results.sort();
  return sorted.slice(0, 10);
}

// -- Selectors
export function getLeaderboardResults(state) {
  return state.leaderboard.results;
}

export function getSelectedLeaderboardBoard(state) {
  return state.leaderboard.selectedBoard;
}
export function isLeaderboardLoading(state) {
  return state.leaderboard.isLoading;
}
