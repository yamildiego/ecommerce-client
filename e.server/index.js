const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const routesApi = require("./src/routes/api");
const routesProducts = require("./src/routes/products");

let isProduction = false;
let svr = isProduction ? "/svr_1" : "";

let localhost =
  "mongodb://myUserAdmin:abc123@localhost:27017/ecommerce?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";
let hosting = "";

mongoose.connect(isProduction ? hosting : localhost, { useNewUrlParser: true }).then(() => {
  const app = express();
  app.use(express.json());
  app.use(session({ secret: "8JyLd{C7fk]JFDD>", saveUninitialized: true, resave: true }));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(cors({ origin: "http://localhost:3000", credentials: true }));
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT ,DELETE");
    res.header("Access-Control-Allow-Credentials", true);
    next();
  });

  app.use(`${svr}/`, routesApi);
  app.use(`${svr}/products`, routesProducts);

  app.listen(5000, () => {
    console.log("Server has started!");
  });
});
