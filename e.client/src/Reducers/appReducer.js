import * as Types from "../Reducers/Types";

const initialState = {
  filterOpen: true,
};

export default function appReducer(state = initialState, action = {}) {
  switch (action.type) {
    case Types.TOGGLE_FILTER: {
      return { ...state, filterOpen: !state.filterOpen };
    }
    default:
      return state;
  }
}
