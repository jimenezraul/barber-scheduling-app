const reducer = (state = false, action) => {
  switch (action.type) {
    case "showInfo":
      return (state = action.payload);
    case "hideInfo":
      return (state = action.payload);
    default:
      return state;
  }
};

export default reducer;
