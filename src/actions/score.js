export function resetScore() {
  return dispatch => {
    dispatch({ type: "RESET_SCORE" });
  };
}
