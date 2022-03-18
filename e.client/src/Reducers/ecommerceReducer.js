import * as Types from "../Reducers/Types";

const initFiltersStructures = {
  category: {
    title: "Category",
    expanded: true,
    options: [
      { key: "FOOTWEAR", label: "Shoes" },
      { key: "APPAREL", label: "Clothing" },
      { key: "EQUIPMENT", label: "Accessories & Equipment" },
    ],
  },
  gender: {
    title: "Gender",
    expanded: true,
    options: [
      { key: "MEN", label: "Men" },
      { key: "WOMEN", label: "Women" },
      { key: "UNISEX", label: "Unisex" },
    ],
  },
  kids: {
    title: "Kids",
    expanded: true,
    options: [
      { key: "BOYS", label: "Boys" },
      { key: "GIRLS", label: "Girls" },
    ],
  },
  onSale: {
    title: "On Sale",
    expanded: true,
    options: [{ key: "ON_SALE", label: "Sale" }],
  },
  price: { title: "Price", expanded: true, limits: [0, 600] },
};

const initFilters = { category: [], gender: [], kids: [], onSale: [], price: [30, 450], page: 1 };
const initSortStructures = [
  { name: "Newest", value: { pid: -1 } },
  { name: "Price: High-Low", value: { "price.currentPrice": -1 } },
  { name: "Price: Low-High", value: { "price.currentPrice": 1 } },
];
const initSort = null;

const initialState = {
  isLoading: true,
  search: "",
  length: 0,
  products: [],
  totalPages: 0,
  filtersStructures: initFiltersStructures,
  filters: initFilters,
  sortsStructures: initSortStructures,
  sort: initSort,
  showReset: false,
};

export default function appReducer(state = initialState, action = {}) {
  switch (action.type) {
    case Types.SET_SEARCH: {
      return { ...state, search: action.search };
    }
    case Types.SET_FILTERS: {
      return { ...state, filters: { ...action.filters, page: 1 }, showReset: true, isLoading: true };
    }
    case Types.SET_PAGE: {
      return { ...state, filters: { ...state.filters, page: action.page } };
    }
    case Types.SET_SORT: {
      return { ...state, sort: action.sort };
    }
    case Types.SET_FILTERS_STRUCTURES: {
      return { ...state, filtersStructures: action.filtersStructures };
    }
    case Types.SET_IS_LOADING_SHOP: {
      return { ...state, isLoading: action.isLoading };
    }
    case Types.SET_PRODUCTS: {
      return { ...state, products: action.products };
    }
    case Types.SET_TOTAL_PAGES: {
      return { ...state, totalPages: action.totalPages };
    }
    case Types.RESET_FILTER: {
      return {
        ...state,
        filters: { ...initFilters, ...action.filters },
        filtersStructures: initFiltersStructures,
        showReset: false,
        isLoading: true,
      };
    }
    default:
      return state;
  }
}
