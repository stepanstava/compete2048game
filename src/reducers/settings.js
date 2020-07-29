const initialState = {
  formData: {
    values: {
      rows: [3, 4, 5, 6],
      columns: [3, 4, 5, 6],
      winningSquare: [128, 256, 512, 1024, 2048, 4096, 8192, 16384],
      gameMode: [1, 2],
    },
    icons: {
      rows: "fas fa-grip-horizontal",
      columns: "fas fa-grip-vertical",
      winningSquare: "far fa-square",
      gameMode: "fas fa-dice-two",
    },
    displayNames: {
      rows: "Rows",
      columns: "Columns",
      winningSquare: "Winning Square",
      gameMode: "Game Mode",
    },
  },
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
export function getFormData(state) {
  return state.settings.formData;
}
// export function getFormDataIcons(state) {
//   return state.settings.formDataIcons;
// }

export function getSelectedOptions(state) {
  return state.settings.selectedOptions;
}
