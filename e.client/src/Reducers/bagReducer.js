import * as Types from "../Reducers/Types";

const initialState = {
  items: [],
  qty: 0,
  delivery: 35,
  total: 0,
  activeStep: 0,
};

export default function bagReducer(state = initialState, action = {}) {
  switch (action.type) {
    case Types.SET_ITEMS: {
      let qty = 0;
      let total = 0;

      action.items.forEach((item) => {
        qty += item.qty;
        total += item.qty * item.price;
      });

      return { ...state, items: action.items, qty, total };
    }
    case Types.SET_ACTIVE_STEP: {
      return { ...state, activeStep: action.activeStep };
    }
    default:
      return state;
  }
}
