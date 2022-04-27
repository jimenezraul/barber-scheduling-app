const reducer = (state = localStorage.theme === "dark", action) => {
  switch (action.type) {
    case "toggleOn":
      return (state = action.payload);
    case "toggleOff":
      return (state = action.payload);
    default:
      return state;
  }
};

export default reducer;
