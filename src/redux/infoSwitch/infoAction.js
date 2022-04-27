export const showInfo = (action) => {
  return (dispatch) => {
    dispatch({
      type: "showInfo",
      payload: action,
    });
  };
};

export const hideInfo = (action) => {
  return (dispatch) => {
    dispatch({
      type: "hideInfo",
      payload: action,
    });
  };
};
