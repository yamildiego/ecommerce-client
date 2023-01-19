import * as Types from "../Reducers/Types";

const initialState = {
  formValidationLogin: { username: { error: false, helperText: "" }, password: { error: false, helperText: "" } },
  user: null,
  errorGeneral: "",
};

export default function profileReducer(state = initialState, action = {}) {
  switch (action.type) {
    case Types.SET_FORM_VALIDATION_LOGIN: {
      return { ...state, formValidationLogin: action.formValidationLogin };
    }
    case Types.SET_USER: {
      return { ...state, user: action.user };
    }
    case Types.SET_ERROR_GENERAL: {
      return { ...state, errorGeneral: action.errorGeneral };
    }
    default:
      return state;
  }
}
