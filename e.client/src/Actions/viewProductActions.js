import * as Types from "../Reducers/Types";
import * as Urls from "../Constants/Urls";
import axios from "axios";

const server = axios.create({ withCredentials: true });

export const setIsLoadingView = (isLoading) => ({
  type: Types.SET_IS_LOADING_VIEW,
  isLoading,
});

export const setIsLoadingImages = (isLoadingImages) => ({
  type: Types.SET_IS_LOADING_IMAGES,
  isLoadingImages,
});

export const setProductSelected = (productSelected) => ({
  type: Types.SET_PRODUCT_SELECTED,
  productSelected,
});

export const setColors = (colors) => ({
  type: Types.SET_COLORS,
  colors,
});

export const addPicture = (id, src) => ({
  type: Types.ADD_PICTURE,
  id,
  src,
});

export const cleanProductSelected = () => ({
  type: Types.CLEAN_PRODUCT_SELECTED,
});

export const setColor = (color) => ({
  type: Types.SET_COLOR,
  color,
});

export const setSize = (size) => ({
  type: Types.SET_SIZE,
  size,
});

export const qty = (qty) => ({
  type: Types.SET_QTY,
  qty,
});

export const getProduct = (cloudProductId) => {
  return async (dispatch) => {
    dispatch(setIsLoadingView(true));
    await server
      .post(`${Urls.getProduct}`, { cloudProductId })
      .then((response) => {
        if (response.data.status === "OK") {
          dispatch(setProductSelected(response.data.item));
          dispatch(setIsLoadingView(false));
        }
      })
      .catch((error) => {
        console.log("getProduct");
      });
  };
};

export const loadColors = (colorways) => {
  return async (dispatch) => {
    dispatch(setIsLoadingImages(true));

    let promises = [];
    let colors = [];

    colorways.forEach((colorway) => {
      let color = { id: colorway.pid, label: colorway.colorDescription, src: null };
      let p = fetch(colorway.images.portraitURL.replace("w_400", "w_592"))
        .then((res) => res.blob())
        .then(blobToBase64);
      promises[colorway.pid] = p;
      colors.push(color);
    });

    dispatch(setColors(colors));

    promises.forEach((p, index) => {
      p.then((response) => {
        dispatch(addPicture(index, response));
      });
    });
  };
};

const blobToBase64 = (blob) => {
  const reader = new FileReader();
  reader.readAsDataURL(blob);
  return new Promise((resolve) => {
    reader.onloadend = () => {
      resolve(reader.result);
    };
  });
};
