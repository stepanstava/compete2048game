const initialState = {
  score: 0,
  shouldBoardMove: true,
  scoreRound: 0,
  isWinning: false,
  isLosing: false,
  goal: 256,
  doubleSquareProb: 0.1,
  moveAnimationDuration: 400,
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
    case "RESET_SCORE": {
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
      };
    }

    case "UPDATE_SCORE": {
      const { score } = action;
      const newScore = state.score + score;

      return {
        ...state,
        score: newScore,
      };
    }
    case "UPDATE_SCORE_ROUND": {
      const { scoreRound } = action;

      return {
        ...state,
        scoreRound,
      };
    }

    case "CLEAR_SCORE_ROUND": {
      return {
        ...state,
        scoreRound: 0,
      };
    }

    case "UPDATE_SHOULD_MOVE": {
      const { shouldBoardMove } = action;
      return {
        ...state,
        shouldBoardMove,
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

export function getGameScoreRound(state) {
  return state.game.scoreRound;
}

export function shouldBoardMove(state) {
  return state.game.shouldBoardMove;
}

export function isWinningState(state) {
  return state.game.isWinning;
}

export function isLosingState(state) {
  return state.game.isLosing;
}
export function getMoveAnimationDuration(state) {
  return state.game.moveAnimationDuration;
}
