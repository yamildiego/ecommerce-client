import * as Types from "../Reducers/Types";

export const toggleFilter = (filterOpen) => ({
  type: Types.TOGGLE_FILTER,
  filterOpen,
});
