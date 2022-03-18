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

export const setPicturesProductSelected = (picturesProductSelected) => ({
  type: Types.SET_PICTURES_PRODUCT_SELECTED,
  picturesProductSelected,
});

export const addPictureProductSelected = (pictureProductSelected) => ({
  type: Types.ADD_PICTURES_PRODUCT_SELECTED,
  pictureProductSelected,
});

export const cleanProductSelected = () => ({
  type: Types.CLEAN_PRODUCT_SELECTED,
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

export const loadImages = (colorways) => {
  return async (dispatch) => {
    let promises = [];
    dispatch(setIsLoadingImages(true));
    colorways.forEach((colorway) => {
      let p = fetch(colorway.images.portraitURL.replace("w_400", "w_592"))
        .then((res) => res.blob())
        .then(blobToBase64);
      promises.push(p);
    });

    promises.forEach((p) => {
      p.then((response) => {
        dispatch(addPictureProductSelected(response));
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
