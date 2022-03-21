import * as Types from "../Reducers/Types";

const initialState = {
  isLoading: false,
  isLoadingImages: false,
  productSelected: null,
  colors: [],
  color: null,
  size: null,
  qty: 1,
};

export default function viewProductReducer(state = initialState, action = {}) {
  switch (action.type) {
    case Types.SET_IS_LOADING_VIEW: {
      return { ...state, isLoading: action.isLoading };
    }
    case Types.SET_IS_LOADING_IMAGES: {
      return { ...state, isLoadingImages: action.isLoadingImages };
    }
    case Types.SET_PRODUCT_SELECTED: {
      return { ...state, productSelected: action.productSelected, picturesProductSelected: [], size: null, color: null, qty: 1 };
    }
    case Types.ADD_PICTURE: {
      let colors = [];
      state.colors.forEach((color) => colors.push(String(color.id) !== String(action.id) ? color : { ...color, src: action.src }));

      return { ...state, colors };
    }
    case Types.CLEAN_PRODUCT_SELECTED: {
      return { ...initialState };
    }
    case Types.SET_COLOR: {
      return { ...state, color: action.color };
    }
    case Types.SET_COLORS: {
      return { ...state, colors: action.colors };
    }
    case Types.SET_SIZE: {
      return { ...state, size: action.size };
    }
    case Types.SET_QTY: {
      return { ...state, qty: action.qty };
    }
    default:
      return state;
  }
}
