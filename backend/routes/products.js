// routes/products.js
const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// Lấy tất cả sản phẩm
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();  // Lấy tất cả sản phẩm từ MongoDB
    res.json(products);  // Trả lại danh sách sản phẩm
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
});

// Thêm sản phẩm mới
router.post('/add', async (req, res) => {
  const { name, price, category, recommended, discount, src } = req.body;

  try {
    const newProduct = new Product({
      name,
      price,
      category,
      recommended,
      discount,
      src
    });

    await newProduct.save();
    res.status(200).json({ message: 'Product added successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error adding product', error: err });
  }
});

module.exports = router;
