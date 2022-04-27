export const darkOn = (action) => {
  return (dispatch) => {
    dispatch({
      type: "toggleOn",
      payload: action,
    });
  };
};

export const darkOff = (action) => {
  return (dispatch) => {
    dispatch({
      type: "toggleOff",
      payload: action,
    });
  };
};
