import { combineReducers } from "redux";
import configReducer from "./configReducer";
import appReducer from "./appReducer";
import apiReducer from "./apiReducer";
import ecommerceReducer from "./ecommerceReducer";

export default combineReducers({
  configReducer,
  appReducer,
  apiReducer,
  ecommerceReducer,
});
