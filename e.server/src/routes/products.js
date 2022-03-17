const express = require("express");
const router = express.Router();

const Product = require("../models/Product");
var ObjectId = require("mongodb").ObjectID;

router.get("/test", async (req, res) => {
  let cat = [];
  Product.find({}, (err, docs) => {
    docs.forEach((doc) => {
      console.log(doc.gender);
      cat = cat.concat(doc.genders);
      // if (!cat.includes(doc.category)) cat.push(doc.category);
      // if (!cat.includes(doc.category)) cat.push(doc.category);
    });

    let items = [...new Set(cat)];

    res.send({ status: "OK", items });
  });
});

router.post("/getProduct", async (req, res) => {
  let dataPost = { ...req.body };
  Product.find({ cloudProductId: dataPost.cloudProductId }, (err, docs) => {
    let item = null;
    if (docs.length > 0) item = docs[0];
    res.send({ status: "OK", item });
  });
});

router.post("/", async (req, res) => {
  let dataPost = { ...req.body };
  let genders = {};
  let realFilters = [];
  let filterPrice = { "price.currentPrice": { $gt: dataPost.filter.price[0], $lt: dataPost.filter.price[1] } };
  realFilters.push(filterPrice);

  if (dataPost.filter["kids"].length > 0) realFilters.push({ genders: { $in: dataPost.filter["kids"] } });
  else {
    if (dataPost.filter["gender"].includes("MEN")) realFilters.push({ genders: { $in: ["MEN", "BOYS"] } });
    if (dataPost.filter["gender"].includes("WOMEN")) realFilters.push({ genders: { $in: ["WOMEN", "GIRLS"] } });
    if (dataPost.filter["gender"].includes("UNISEX"))
      realFilters.push({
        $or: [{ $and: [{ genders: "MEN" }, { genders: "WOMEN" }] }, { $and: [{ genders: "BOYS" }, { genders: "GIRLS" }] }],
      });
  }

  if (dataPost.filter["category"].length > 0) realFilters.push({ category: { $in: dataPost.filter["category"] } });
  if (dataPost.filter["onSale"].length > 0) realFilters.push({ isOnSale: true });

  const options = {
    page: dataPost.filter.page ? dataPost.filter.page : 1,
    limit: 24,
    sort: dataPost.sort ? dataPost.sort : {},
  };

  Product.paginate({ $and: realFilters }, options, (err, result) => {
    let itemsData = [];

    result.docs.forEach((doc) => {
      itemsData.push(doc);
    });

    res.send({ status: "OK", items: itemsData, totalPages: result.totalPages });
  });
});

module.exports = router;
