const dotenv = require("dotenv").config();
module.exports = {
  IS_PRODUCTION: false,
  STRIPE_SK: process.env.STRIPE_SK,
  DOMAIN: process.env.DOMAIN,
  SHIPPING_PRICE: process.env.SHIPPING_PRICE,
  LOCAL_MONGODB_CONNECTION: process.env.LOCAL_MONGODB_CONNECTION,
  SERVER_MONGODB_CONNECTION: process.env.SERVER_MONGODB_CONNECTION,
};
