const INITIAL_STATE = {
  currentServiceKey: "",
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "KEY":
      return { currentServiceKey: action.payload };
    default:
      return state;
  }
};

export default reducer;
