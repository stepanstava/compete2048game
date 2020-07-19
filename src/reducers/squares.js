
const initialState = {
  squares: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "ADD_SQUARE": {
      const { square } = action;
      const updatedSquares = [...state.squares, square];
      
      return {
        ...state,
        squares: updatedSquares,
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
      // const updatedSquares = [...state.squares];

      const filtred = state.squares.filter(sq => sq.id !== id);

      return {
        ...state,
        squares: filtred,
      };

    }

    default:
      return state;
  }
}

export function getSquares(state) {
  return state.squares.squares;
}