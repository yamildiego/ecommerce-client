import * as Types from "../Reducers/Types";

export const setItems = (items) => ({
  type: Types.SET_ITEMS_WISHLIST,
  items,
});
export const addItem = (item) => ({
  type: Types.ADD_ITEM,
  item,
});

export const removeItem = (cloudProductId) => ({
  type: Types.REMOVE_ITEM,
  cloudProductId,
});

export const cleanItems = () => ({
  type: Types.CLEAN_ITEMS,
});
