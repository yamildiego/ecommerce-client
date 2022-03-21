import * as Types from "../Reducers/Types";

const getSize = (width) => {
  let size = "";
  if (width >= 1024) size = "L";
  if (width >= 768 && width < 1024) size = "M";
  if (width < 768) size = "S";

  return size;
};

const initialState = {
  isLoading: false,
  slideMenuOpen: false,
  optionsMenu: false,
  dimensions: { width: window.innerWidth, height: window.innerHeight, size: getSize(window.innerWidth) },
  theme: {
    palette: {
      primary: { main: "#f55e3f", light: "#f88e78", dark: "#c44b32" },
    },
    shape: { borderRadius: 1 },
  },
};

export default function appReducer(state = initialState, action = {}) {
  switch (action.type) {
    case Types.TOGGLE_OPTIONS_MENU: {
      return { ...state, optionsMenu: !state.optionsMenu };
    }
    case Types.TOGGLE_SLIDE_MENU_OPEN: {
      return { ...state, slideMenuOpen: !state.slideMenuOpen };
    }
    case Types.SET_IS_LOADING: {
      return { ...state, isLoading: action.isLoading };
    }
    case Types.SET_DIMENSIONS: {
      return { ...state, dimensions: { ...action.dimensions, size: getSize(action.dimensions.width) } };
    }
    default:
      return state;
  }
}
