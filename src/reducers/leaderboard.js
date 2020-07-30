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
};

export default function (state = initialState, action) {
  switch (action.type) {
    // case "ADD_SQUARE": {
    //   const { square } = action;
    //   const updatedSquares = [...state.squares, square];
    //   const squaresCount = state.squaresCount;

    //   return {
    //     ...state,
    //     squares: updatedSquares,
    //     squaresCount: squaresCount + 1,
    //   };
    // }

    default:
      return state;
  }
}

// -- Selectors
export function getLeaderboardResults(state) {
  return state.leaderboard.results;
}

export function getSelectedLeaderboardBoard(state) {
  return state.leaderboard.selectedBoard;
}
