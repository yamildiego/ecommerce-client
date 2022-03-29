const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const routesApi = require("./src/routes/api");
const routesProducts = require("./src/routes/products");
const config = require("./config");

let svr = config.IS_PRODUCTION ? "/FOLDER_SERVER" : "";

mongoose
  .connect(config.IS_PRODUCTION ? config.SERVER_MONGODB_CONNECTION : config.LOCAL_MONGODB_CONNECTION, { useNewUrlParser: true })
  .then(() => {
    const app = express();
    app.use(express.json());
    app.use(session({ secret: "8JyLd{C7fk]JFDD>", saveUninitialized: true, resave: true }));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(cors({ origin: config.DOMAIN, credentials: true }));
    app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", config.DOMAIN);
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
