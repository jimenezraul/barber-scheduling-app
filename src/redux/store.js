import { applyMiddleware, createStore } from "redux";
import reducers from "./reducers";
import thunk from "redux-thunk";
import {
  createStateSyncMiddleware,
  initMessageListener,
} from "redux-state-sync";

const reduxStateSyncConfig = {};

export const store = createStore(
  reducers,
  {},
  applyMiddleware(thunk, createStateSyncMiddleware(reduxStateSyncConfig))
);

initMessageListener(store);
