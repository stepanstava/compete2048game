const initialState = {
  score: 0,
  shouldBoardMove: true,
  roundScore: 0,
  isWinning: false,
  isLosing: false,
  goal: 256,
  doubleSquareProb: 0.1,
  moveAnimationDelay: 400,
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
      const scoreUpdated = state.score + roundScore;

      return {
        ...state,
        roundScore,
        score: scoreUpdated,
      };
    }
    case "UPDATE_GAME_SCORE": {
      const { score } = action;
    

      return {
        ...state,

        score,
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

    default:
      return state;
  }
}

// -- Selectors
export function getGameScore(state) {
  return state.game.score;
}

export function getGameroundScore(state) {
  return state.game.roundScore;
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
export function getmoveAnimationDelay(state) {
  return state.game.moveAnimationDelay;
}
