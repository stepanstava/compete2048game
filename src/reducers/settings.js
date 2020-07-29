const initialState = {
  selectedOptions: {
    rows: 4,
    columns: 4,
    winningSquare: 2048,
    gameMode: 2,
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "SAVE_OPTION": {
      const { selectName, value } = action;

      return {
        ...state,
        selectedOptions: {
          ...state.selectedOptions,
          [selectName]: value,
        },
      };
    }

    case "LOAD_SELECTED_OPTIONS": {
      const { rows, columns, winningSquare, gameMode } = action.selectedOptions;

      return {
        ...state,
        selectedOptions: {
          ...state.selectedOptions,
          rows,
          columns,
          winningSquare,
          gameMode,
        },
      };
    }

    default:
      return state;
  }
}

// -- Selectors
export function getSelectedOptions(state) {
  return state.settings.selectedOptions;
}
