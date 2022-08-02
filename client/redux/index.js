import { combineReducers } from "redux";

import singleItemReducer from "./singleItem";

const appReducer = combineReducers({
  singleItem: singleItemReducer,
});

export default appReducer;
