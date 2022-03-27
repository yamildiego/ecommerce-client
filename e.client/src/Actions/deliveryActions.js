import * as Types from "../Reducers/Types";
import * as Urls from "../Constants/Urls";
import axios from "axios";

import * as configActions from "./configActions";

const server = axios.create({ withCredentials: true });

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

export const reviewAndPay = () => {
  return async (dispatch) => {
    dispatch(configActions.setIsLoading(true));
    await server
      .post(`${Urls.reviewAndPay}`, {})
      .then((response) => {
        if (response.data.status === "OK") dispatch(setUrlPayment(response.data.url));
      })
      .catch((error) => {
        console.log("reviewAndPay");
      });
  };
};
