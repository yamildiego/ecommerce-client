const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const random = require("mongoose-simple-random");
var ObjectId = require("mongodb").ObjectID;

const ProductSchema = mongoose.Schema({
  title: String,
  subtitle: String,
  colorways: [{ colorDescription: String, images: Object }],
  images: Object,
  price: { currency: String, currencyPrice: Number, discounted: Boolean, fullPrice: Number },
  productType: String,
  genders: [String],
  category: String,
  cloudProductId: String,
  isOnSale: Boolean,
  price: {
    priceId: String,
    currentPrice: Number,
    fullPrice: Number,
  },
});

ProductSchema.plugin(mongoosePaginate);
ProductSchema.plugin(random);

module.exports = mongoose.model("Product", ProductSchema);
