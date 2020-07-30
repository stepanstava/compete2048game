const initialState = {
  shouldBoardMove: true,
  score: 0,
  roundScore: 0,
  bestScore: 0,
  isWinning: false,
  keepPlayingMode: false,
  isLosing: false,
  goal: 2048,
  doubleSquareProb: 0.1,
  moveAnimationDelay: 250,
  isSettingsOpen: false,
  gameMode: 2,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "ADD_WINNER": {
      return {
        ...state,
        isWinning: true,
        shouldBoardMove: false,
      };
    }
    case "CLEAR_SCORE": {
      return {
        ...state,
        score: 0,
      };
    }

    case "CLEAR_GAME_STATES": {
      return {
        ...state,
        shouldBoardMove: true,
        isWinning: false,
        isLosing: false,
        keepPlayingMode: false,
      };
    }

    case "UPDATE_IS_WINNING": {

      const { isWinning } = action;
      return {
        ...state,
        isWinning,
      };
    }

    case "UPDATE_IS_LOSING": {
      const { isLosing } = action;
      return {
        ...state,
        isLosing,
      };
    }
    case "SET_KEEP_PLAYING": {
      return {
        ...state,
        keepPlayingMode: true,
        isWinning: false,
        shouldBoardMove: true,
      };
    }

    case "LOAD_KEEP_PLAYING": {
      const { keepPlayingMode } = action;
      return {
        ...state,
        keepPlayingMode,
      };
    }

    // case "UPDATE_SCORE": {
    //   const { score } = action;
    //   const newScore = state.score + score;

    //   return {
    //     ...state,
    //     score: newScore,
    //   };
    // }
    case "UPDATE_SCORE": {
      const { roundScore } = action;
      const bestScore = state.bestScore;

      const scoreUpdated = state.score + roundScore;

      return {
        ...state,
        roundScore,
        score: scoreUpdated,
        bestScore: scoreUpdated > bestScore ? scoreUpdated : bestScore
      };
    }
    case "UPDATE_GAME_SCORE": {
      const { score } = action;
      return {
        ...state,
        score,
      };
    }
    case "UPDATE_BEST_SCORE": {
      const { bestScore } = action;
      return {
        ...state,
        bestScore,
      };
    }

    case "CLEAR_ROUND_SCORE": {
      return {
        ...state,
        roundScore: 0,
      };
    }

    case "UPDATE_SHOULD_MOVE": {
      const { shouldBoardMove } = action;
      return {
        ...state,
        shouldBoardMove,
      };
    }
    case "TOGGLE_SETTINGS": {
      return {
        ...state,
        isSettingsOpen: !state.isSettingsOpen,
      };
    }
    case "CLOSE_SETTINGS": {
      return {
        ...state,
        isSettingsOpen: false,
      };
    }
    case "UPDATE_GOAL": {
      const { goal } = action;
      return {
        ...state,
        goal,
      };
    }
    case "UPDATE_GAME_MODE": {
      const { mode } = action;
      return {
        ...state,
        gameMode: mode,
      };
    }

    default:
      return state;
  }
}

// -- Selectors
export function getGameScore(state) {
  return state.game.score;
}

export function getGameRoundScore(state) {
  return state.game.roundScore;
}
export function getBestScore(state) {
  return state.game.bestScore;
}

export function shouldBoardMove(state) {
  return state.game.shouldBoardMove;
}
export function getDoubleSquareProb(state) {
  return state.game.doubleSquareProb;
}

export function isWinningState(state) {
  return state.game.isWinning;
}

export function isLosingState(state) {
  return state.game.isLosing;
}
export function getmoveAnimationDelay(state) {
  return state.game.moveAnimationDelay;
}

export function getGameGoal(state) {
  return state.game.goal;
}
export function isKeepPlayingMode(state) {
  return state.game.keepPlayingMode;
}
export function isSettingsOpen(state) {
  return state.game.isSettingsOpen;
}
export function getGameMode(state) {
  return state.game.gameMode;
}
