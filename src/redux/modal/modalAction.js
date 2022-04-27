export const modalOpen = (action) => {
  return (dispatch) => {
    dispatch({
      type: "modalOpen",
      payload: action,
    });
  };
};

export const modalClose = (action) => {
  return (dispatch) => {
    dispatch({
      type: "modalClose",
      payload: action,
    });
  };
};
