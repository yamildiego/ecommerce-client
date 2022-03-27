import * as Types from "../Reducers/Types";

const initialState = {
  address: { address: "", suburb: "", state: "", postcode: "" },
  personal: { email: "", phone: "" },
  errors: { email: false, phone: false, address: false },
  helperText: { email: "", phone: "", address: "" },
  urlPayment: null,
};

export default function deliveryReducer(state = initialState, action = {}) {
  switch (action.type) {
    case Types.SET_ADDRESS: {
      return { ...state, address: action.address };
    }
    case Types.SET_PERSONAL: {
      return { ...state, personal: action.personal };
    }
    case Types.SET_ERRORS_DELIVERY: {
      return { ...state, errors: action.errors };
    }
    case Types.SET_ERRORS_HELPERTEXT: {
      return { ...state, helperText: action.helperText };
    }
    case Types.SET_URL_PAYMENT: {
      return { ...state, urlPayment: action.urlPayment };
    }
    default:
      return state;
  }
}
