const INITIAL_STATE = {
  service: [],
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SERVICE":
      return {
        service: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
