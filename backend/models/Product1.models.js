import mongoose from 'mongoose';

const productSchema1 = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true }, 
  companyName: { type: String, required: true },
  weights: { type: [Number], required: true },  
  description: { type: String, required: true },
  images: { type: [String], required: true },
  recommended: { type: Boolean, default: false },  
  discount: { type: Boolean, default: false },  
}, { timestamps: true });

const Product1 = mongoose.model('Product1', productSchema1);

export default Product1;