const initialState = {
  squares: [],
  squaresCount: 0,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "ADD_SQUARE": {
      const { square } = action;
      const updatedSquares = [...state.squares, square];
      const squaresCount = state.squaresCount;

      return {
        ...state,
        squares: updatedSquares,
        squaresCount: squaresCount + 1,
      };
    }

    case "UPDATE_SQUARE": {
      const { id } = action.square;
      const updatedSquares = [...state.squares];

      const index = updatedSquares.findIndex(sq => sq.id === id);
      if (index >= 0) {
        updatedSquares[index] = action.square;
      } else {
        updatedSquares.push(action.square);
      }

      return {
        ...state,
        squares: updatedSquares,
      };
    }

    case "REMOVE_SQUARE": {
      const { id } = action.square;
      const squaresCount = state.squaresCount;

      const filtred = state.squares.filter(sq => sq.id !== id);

      return {
        ...state,
        squares: filtred,
        squaresCount: squaresCount - 1,
      };
    }

    case "CLEAR_SQUARES": {
      const { square } = action;

      return {
        ...state,
        squares: [],
        squaresCount: 0,
      };
    }

    default:
      return state;
  }
}

// -- Selectors
export function getSquares(state) {
  return state.squares.squares;
}
