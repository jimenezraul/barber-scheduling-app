import { CATEGORY } from "./categoryAction";

const INITIAL_STATE = {
  category: JSON.parse(localStorage.getItem("category")) || {},
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CATEGORY:
      localStorage.setItem("category", JSON.stringify(action.payload));
      return {
        category: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
