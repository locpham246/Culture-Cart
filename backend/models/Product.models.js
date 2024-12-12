import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true }, 
  category: { type: String, required: true },
  image: { type: String, default: 'default_image_url.jpg' },  
  recommended: { type: Boolean, default: false },  
  discount: { type: Boolean, default: false },  
}, { timestamps: true });  

const Product = mongoose.model('Product', productSchema);

export default Product;
