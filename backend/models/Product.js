// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  category: { type: String, required: true },
  recommended: { type: Boolean, default: false },
  discount: { type: Boolean, default: false },
  src: { type: String, required: true },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
