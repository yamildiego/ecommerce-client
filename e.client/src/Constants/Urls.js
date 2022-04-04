export const baseUrl =
  process.env.REACT_APP_PRODUCTION === "1" ? process.env.REACT_APP_BASE_URL_PRODUCTION : process.env.REACT_APP_BASE_URL_DEVELOPMENT;

//ecommerce
export const loadProducts = baseUrl + "products/";
export const getProduct = baseUrl + "products/getProduct";

//delivery
export const reviewAndPay = baseUrl + "create-checkout-session";
