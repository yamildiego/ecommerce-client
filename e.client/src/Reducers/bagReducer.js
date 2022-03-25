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
    case Types.ADD_ITEM: {
      let items = [];
      let added = false;
      state.items.forEach((item) => {
        if (item.id === action.item.id && item.size.size === action.item.size.size && item.color.id === action.item.color.id) {
          added = true;
          items.push({ ...item, qty: Number(item.qty) + Number(action.item.qty) });
        } else items.push(action.item);
      });

      if (!added) items.push(action.item);

      return {
        ...state,
        items,
        qty: Number(state.qty) + Number(action.item.qty),
        total: state.total + action.item.price * Number(action.item.qty),
      };
    }
    case Types.REMOVE_ITEM: {
      let items = [];

      state.items.forEach((item) => {
        if (!(item.id === action.item.id && item.size.size === action.item.size.size && item.color.id === action.item.color.id))
          items.push(action.item);
      });

      return {
        ...state,
        items,
        qty: Number(state.qty) - Number(action.item.qty),
        total: state.total - action.item.price * Number(action.item.qty),
      };
    }
    case Types.CHANGE_QTY: {
      let items = [];
      let oldQty = 0;
      state.items.forEach((item) => {
        if (item.id === action.item.id && item.size.size === action.item.size.size && item.color.id === action.item.color.id) {
          oldQty = Number(item.qty);
          items.push(action.item);
        } else items.push(action.item);
      });

      return {
        ...state,
        items,
        qty: Number(state.qty) - Number(oldQty) + Number(action.item.qty),
        total: Number(state.total) - Number(oldQty * action.item.price) + Number(action.item.price * action.item.qty),
      };
    }
    case Types.SET_ACTIVE_STEP: {
      return { ...state, activeStep: action.activeStep };
    }
    default:
      return state;
  }
}

// id: this.props.cloudProductId,
// title: this.props.title,
// subtitle: this.props.subtitle,
// color: this.props.color,
// size: this.props.size,
// qty: 1,
// price: this.props.price.currentPrice,
// colors: this.props.colors,
// dateTime: Date.now(),
