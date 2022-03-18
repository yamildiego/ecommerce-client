import * as Types from "../Reducers/Types";

const initialState = {
  isLoading: false,
  isLoadingImages: false,
  productSelected: null,
  picturesProductSelected: [],
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
      return { ...state, productSelected: action.productSelected };
    }
    case Types.SET_PICTURES_PRODUCT_SELECTED: {
      return { ...state, picturesProductSelected: action.picturesProductSelected };
    }
    case Types.ADD_PICTURES_PRODUCT_SELECTED: {
      return { ...state, picturesProductSelected: [...state.picturesProductSelected, action.pictureProductSelected] };
    }
    case Types.CLEAN_PRODUCT_SELECTED: {
      return { ...initialState };
    }
    default:
      return state;
  }
}
