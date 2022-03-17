import * as Types from "../Reducers/Types";
import * as Urls from "../Constants/Urls";
import axios from "axios";

const server = axios.create({ withCredentials: true });

export const setSearch = (search) => ({
  type: Types.SET_SEARCH,
  search,
});

export const setFilters = (filters) => ({
  type: Types.SET_FILTERS,
  filters,
});

export const setSort = (sort) => ({
  type: Types.SET_SORT,
  sort,
});

export const setPage = (page) => ({
  type: Types.SET_PAGE,
  page,
});

export const resetFilter = (filters = {}) => ({
  type: Types.RESET_FILTER,
  filters,
});

export const setFiltersStructures = (filtersStructures) => ({
  type: Types.SET_FILTERS_STRUCTURES,
  filtersStructures,
});

export const setIsLoading = (isLoading) => ({
  type: Types.SET_IS_LOADING_SHOP,
  isLoading,
});

export const setProducts = (products) => ({
  type: Types.SET_PRODUCTS,
  products,
});

export const setTotalPages = (totalPages) => ({
  type: Types.SET_TOTAL_PAGES,
  totalPages,
});

export const setItemSelected = (itemSelected) => ({
  type: Types.SET_ITEM_SELECTED,
  itemSelected,
});

export const getProduct = (cloudProductId) => {
  return async (dispatch) => {
    dispatch(setIsLoading(true));
    await server
      .post(`${Urls.getProduct}`, { cloudProductId })
      .then((response) => {
        if (response.data.status === "OK") {
          dispatch(setItemSelected(response.data.item));
          dispatch(setIsLoading(false));
        }
      })
      .catch((error) => {
        console.log("getProduct");
      });
  };
};

export const loadProducts = (filter, sort) => {
  return async (dispatch) => {
    dispatch(setIsLoading(true));
    await server
      .post(`${Urls.loadProducts}`, { filter, sort })
      .then((response) => {
        if (response.data.status === "OK") {
          dispatch(setProducts(response.data.items));
          dispatch(setTotalPages(response.data.totalPages));
          dispatch(setIsLoading(false));
        }
      })
      .catch((error) => {
        console.log("loadProducts");
      });
  };
};

export const loadImages = (images) => {
  return async (dispatch) => {
    dispatch(setIsLoading(true));

    console.log("loadImages");
    let promises = [];

    images.forEach((image) => {
      let p = new Promise((resolve, reject) => {
        axios.get(image.portraitURL.replace("w_400", "w_800")).then((response) => {
          console.log(response);
          resolve(response.data);
        });
      });

      promises.push(p);
    });

    Promise.all(promises).then((response) => {
      console.log(response);
      dispatch(setIsLoading(false));
    });
  };
};
