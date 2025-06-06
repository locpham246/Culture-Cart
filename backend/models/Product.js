import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, 
  category: { type: String, required: true }, 
  description: { type: String, required: true },
  weights: { type: [Number] }, 

  images: { type: [String], required: true, default: [] }, 

}, { timestamps: true });

const ProductModel = mongoose.models.Product || mongoose.model("Product", productSchema);

export default ProductModel;