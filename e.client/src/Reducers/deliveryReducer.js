import * as Types from "../Reducers/Types";

const initialStateAddress = { address: "", suburb: "", state: "", postcode: "" };
const initialStatePersonal = { email: "", phone: "" };

const initialState = {
  address: { ...initialStateAddress },
  personal: { ...initialStatePersonal },
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
    case Types.INIT_DELIVERY: {
      return { ...state, address: { ...initialStateAddress }, personal: { ...initialStatePersonal } };
    }
    default:
      return state;
  }
}
