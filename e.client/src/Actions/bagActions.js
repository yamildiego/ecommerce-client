import * as Types from "../Reducers/Types";

export const addItem = (item) => ({
  type: Types.ADD_ITEM,
  item,
});

export const removeItem = (item) => ({
  type: Types.REMOVE_ITEM,
  item,
});

export const changeQty = (item) => ({
  type: Types.CHANGE_QTY,
  item,
});

export const setActiveStep = (activeStep) => ({
  type: Types.SET_ACTIVE_STEP,
  activeStep,
});
