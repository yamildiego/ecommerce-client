import * as Types from "../Reducers/Types";

export const addItem = (item) => ({
  type: Types.ADD_ITEM,
  item,
});

export const changeQty = (item) => ({
  type: Types.CHANGE_QTY,
  item,
});
