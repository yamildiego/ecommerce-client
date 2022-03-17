import * as Types from "../Reducers/Types";

export const setIsLoading = (isLoading) => ({
  type: Types.SET_IS_LOADING,
  isLoading,
});

export const toggleSlideMenuOpen = () => ({
  type: Types.TOGGLE_SLIDE_MENU_OPEN,
});

export const toggleOptionsMenu = () => ({
  type: Types.TOGGLE_OPTIONS_MENU,
});

export const setDimensions = (dimensions) => ({
  type: Types.SET_DIMENSIONS,
  dimensions,
});
