export const setservice = (action) => {
  return (dispatch) => {
    dispatch({
      type: "SERVICE",
      payload: action,
    });
  };
};
