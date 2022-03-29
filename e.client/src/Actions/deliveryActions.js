import * as Types from "../Reducers/Types";
import * as Config from "../Constants/Config";
import * as Urls from "../Constants/Urls";
import * as Errors from "../Constants/Errors";
import axios from "axios";
import localforage from "localforage";

import * as configActions from "./configActions";

const server = axios.create({ withCredentials: true });

export const initDelivery = () => ({
  type: Types.INIT_DELIVERY,
});

export const setAddress = (address) => ({
  type: Types.SET_ADDRESS,
  address,
});

export const setPersonal = (personal) => ({
  type: Types.SET_PERSONAL,
  personal,
});

export const setErrors = (errors) => ({
  type: Types.SET_ERRORS_DELIVERY,
  errors,
});

export const setHelperText = (helperText) => ({
  type: Types.SET_ERRORS_HELPERTEXT,
  helperText,
});

export const setUrlPayment = (urlPayment) => ({
  type: Types.SET_URL_PAYMENT,
  urlPayment,
});

export const reviewAndPay = (personal, address, items, total) => {
  return async (dispatch) => {
    dispatch(configActions.setIsLoading(true));
    await server
      .post(`${Urls.reviewAndPay}`, { items, personal, address, freeShipping: total >= Config.DELIVERY_FREE_FROM })
      .then((response) => {
        dispatch(configActions.setIsLoading(false));
        if (response.data.status === "OK") {
          dispatch(setUrlPayment(response.data.url));
          localforage.setItem("orderNumber", response.data.orderNumber);
        }

        if (response.data.status === "ERROR")
          dispatch(configActions.addError({ severity: "error", title: "Error connection", description: Errors.NO_CONECTION_STRIPE }));
      })
      .catch((error) => {
        dispatch(configActions.setIsLoading(false));
        dispatch(configActions.addError({ severity: "error", title: "Error connection", description: Errors.NO_CONECTION }));
      });
  };
};
