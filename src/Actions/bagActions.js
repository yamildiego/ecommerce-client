import * as Types from "../Reducers/Types";

export const setItems = (items) => ({
  type: Types.SET_ITEMS,
  items,
});

export const setActiveStep = (activeStep) => ({
  type: Types.SET_ACTIVE_STEP,
  activeStep,
});
