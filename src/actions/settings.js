import { getSelectedOptions } from "../selectors";
import { updateBoardDimensions } from "./board";
import {
  updateGameGoal,
  updateGameMode,
  closeSettings,
  gameInit,
} from "./game";

export function saveSelectedOption(selectName, value) {
  return dispatch => {
    dispatch({ type: "SAVE_OPTION", selectName, value });
  };
}

export function saveSettings() {
  return (dispatch, getState) => {
    const selectedOptions = getSelectedOptions(getState());
    const { rows, columns } = selectedOptions;
    const goal = selectedOptions.winningSquare;
    const mode = selectedOptions.gameMode;

    dispatch(updateBoardDimensions({ rows, columns }));
    dispatch(updateGameGoal(goal));
    dispatch(updateGameMode(mode));

    dispatch(closeSettings());

    dispatch(gameInit(true));
  };
}

export function updateSettings(selectedOptions) {
  return (dispatch, getState) => {
    const { rows, columns } = selectedOptions;
    const goal = selectedOptions.winningSquare;
    const mode = selectedOptions.gameMode;

    dispatch(updateBoardDimensions({ rows, columns }));
    dispatch(updateGameGoal(goal));
    dispatch(updateGameMode(mode));

    dispatch(loadSelectedOptions(selectedOptions));
  };
}

export function loadSelectedOptions(selectedOptions) {
  return (dispatch, getState) => {
    dispatch({ type: "LOAD_SELECTED_OPTIONS", selectedOptions });
  };
}

export function loadSettings() {
  return (dispatch, getState) => {
    const settings = getSelectedOptions(getState());
    console.log("loadSettings -> settings", settings)
    dispatch(updateSettings(settings));
  };
}
