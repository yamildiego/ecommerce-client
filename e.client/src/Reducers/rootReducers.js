import { combineReducers } from "redux";
import configReducer from "./configReducer";
import appReducer from "./appReducer";
import apiReducer from "./apiReducer";
import ecommerceReducer from "./ecommerceReducer";
import viewProductReducer from "./viewProductReducer";
import bagReducer from "./bagReducer";

export default combineReducers({
  configReducer,
  appReducer,
  apiReducer,
  ecommerceReducer,
  viewProductReducer,
  bagReducer,
});
