const reducer = (state = false, action) => {
  switch (action.type) {
    case "modalOpen":
      return (state = action.payload);
    case "modalClose":
      return (state = action.payload);
    default:
      return state;
  }
};

export default reducer;
