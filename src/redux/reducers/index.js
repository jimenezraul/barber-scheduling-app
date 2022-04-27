import { combineReducers } from "redux";
import toggleReducer from "../darkMode/darkModeReducer";
import infoReducer from "../infoSwitch/infoReducer";
import userReducer from "../user/userReducer";
import serviceReducer from "../userServices/serviceReducer";
import currentServiceReducer from "../serviceKey/serviceKeyReducer";
import tokenReducer from "../token/tokenReducer";
import modalReducer from "../modal/modalReducer";
import categoryReducer from "../category/categoryReducer";

const reducers = combineReducers({
  toggle: toggleReducer,
  info: infoReducer,
  user: userReducer,
  userservice: serviceReducer,
  serviceKey: currentServiceReducer,
  token: tokenReducer,
  modal: modalReducer,
  category: categoryReducer,
});

export default reducers;
