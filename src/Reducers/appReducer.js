import * as Types from "../Reducers/Types";

const initialState = { filterOpen: true };

export default function appReducer(state = initialState, action = {}) {
  switch (action.type) {
    case Types.TOGGLE_FILTER: {
      let filterOpen = action.filterOpen !== undefined ? action.filterOpen : !state.filterOpen;
      return { ...state, filterOpen };
    }
    default:
      return state;
  }
}
