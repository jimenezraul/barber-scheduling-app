export const currentService = (action) => {
  return (dispatch) => {
    dispatch({
      type: "KEY",
      payload: action,
    });
  };
};
