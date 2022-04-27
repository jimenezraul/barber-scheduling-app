const INITIAL_STATE = {
  token: localStorage.token || {},
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "TOKEN":
      return (state = action.payload);
    default:
      return state;
  }
};

export default reducer;
