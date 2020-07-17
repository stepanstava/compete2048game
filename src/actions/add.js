export function increment() {
  return (dispatch, getState) => {
    console.log(dispatch);

    console.log("state in action", getState());

    dispatch({ type: "INCREMENT" });
  };
}
