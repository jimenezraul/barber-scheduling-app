import { LOGIN, LOGOUT } from "./userAction";

const INITIAL_STATE = {
  currentUser: JSON.parse(localStorage.getItem("user")) || {},
  isAuthUser: !!localStorage.getItem("user"),
  provider: "",
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN:
      localStorage.setItem("user", JSON.stringify(action.payload));
      return {
        isAuthUser: true,
        currentUser: action.payload,
        provider: action.payload.provider,
      };
    case LOGOUT:
      localStorage.removeItem("user");
      return { isAuthUser: false, currentUser: {}, provider: "" };
    default:
      return state;
  }
};

export default reducer;
