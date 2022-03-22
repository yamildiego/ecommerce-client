import * as Types from "../Reducers/Types";

const initialState = {
  items: [],
  qty: 0,
  delivery: 35,
  total: 0,
};

export default function bagReducer(state = initialState, action = {}) {
  switch (action.type) {
    case Types.ADD_ITEM: {
      let items = [];
      let added = false;
      state.items.forEach((item) => {
        if (item.id === action.item.id && item.size.size === action.item.size.size && item.color.id === action.item.color.id) {
          added = true;
          items.push({ ...item, qty: item.qty + action.item.qty });
        } else items.push(action.item);
      });

      if (!added) items.push(action.item);

      return {
        ...state,
        items,
        qty: parseInt(state.qty) + parseInt(action.item.qty),
        total: state.total + action.item.price * action.item.qty,
      };
    }
    case Types.CHANGE_QTY: {
      let items = [];
      let oldQty = 0;
      state.items.forEach((item) => {
        if (item.id === action.item.id && item.size.size === action.item.size.size && item.color.id === action.item.color.id) {
          oldQty = parseInt(item.qty);
          items.push(action.item);
        } else items.push(action.item);
      });

      return {
        ...state,
        items,
        qty: state.qty - oldQty + parseInt(action.item.qty),
        total: state.total - oldQty * action.item.price + action.item.price * action.item.qty,
      };
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
