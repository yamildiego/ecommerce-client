import { combineReducers } from "redux";
import configReducer from "./configReducer";
import appReducer from "./appReducer";
import apiReducer from "./apiReducer";
import ecommerceReducer from "./ecommerceReducer";
import viewProductReducer from "./viewProductReducer";
import bagReducer from "./bagReducer";
import deliveryReducer from "./deliveryReducer";
import wishlistReducer from "./wishlistReducer";

export default combineReducers({
  configReducer,
  appReducer,
  apiReducer,
  ecommerceReducer,
  viewProductReducer,
  bagReducer,
  deliveryReducer,
  wishlistReducer,
});
