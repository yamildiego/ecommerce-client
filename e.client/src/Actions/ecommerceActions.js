import * as Types from "../Reducers/Types";
import * as Urls from "../Constants/Urls";
import * as Errors from "../Constants/Errors";
import axios from "axios";

import * as configActions from "./configActions";

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

export const loadProducts = (filter, search, sort) => {
  return async (dispatch) => {
    dispatch(setIsLoading(true));
    await server
      .post(`${Urls.loadProducts}`, { filter, search, sort })
      .then((response) => {
        if (response.data.status === "OK") {
          dispatch(setProducts(response.data.items));
          dispatch(setTotalPages(response.data.totalPages));
          dispatch(setIsLoading(false));
        }
      })
      .catch((error) => {
        dispatch(configActions.addError({ severity: "error", title: "Error connection loadProducts", description: Errors.NO_CONECTION }));
      });
  };
};
