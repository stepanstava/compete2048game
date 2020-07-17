

const initialState = {
  count: 0
};

export default function(state = initialState, action) {
  switch (action.type) {
    case "INCREMENT": {
      const count = state.count;
      console.log("herrre")
      return {
        ...state,
        count: count + 1
      };
    }

    default:
      return state;
  }
}