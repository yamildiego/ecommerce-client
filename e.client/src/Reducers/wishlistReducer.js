import * as Types from "../Reducers/Types";

const initialState = {
  items: [],
};

export default function wishlistReducer(state = initialState, action = {}) {
  switch (action.type) {
    case Types.SET_ITEMS_WISHLIST: {
      return { ...state, items: action.items };
    }
    case Types.ADD_ITEM: {
      let items = [...state.items];
      items.push(action.item);
      return { ...state, items };
    }
    case Types.REMOVE_ITEM: {
      let items = [];
      state.items.forEach((item) => {
        if (item.cloudProductId !== action.cloudProductId) items.push(item);
      });
      return { ...state, items };
    }
    case Types.CLEAN_ITEMS: {
      return { ...state, items: [] };
    }
    default:
      return state;
  }
}
