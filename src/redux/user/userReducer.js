import { LOGIN, LOGOUT } from "./userAction";
import Cookies from "js-cookie";
const INITIAL_STATE = {
  currentUser: !!Cookies.get('user') ? JSON.parse(Cookies.get('user')) : {} ,
  isAuthUser: !!Cookies.get("user"),
  provider: "",
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        currentUser: action.payload,
        isAuthUser: true,
        provider: action.payload.provider,
      };
    case LOGOUT:
      return { isAuthUser: false, currentUser: {}, provider: "" };
    default:
      return state;
  }
};

export default reducer;
