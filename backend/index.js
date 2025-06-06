import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import userrouter from './routes/user.js';
import profilerouter from './routes/profile.js';
import cookieParser from 'cookie-parser';

import ProductModel from "./models/Product.js"; 
import { Store } from "./models/Store.js";       
import { StoreProduct } from "./models/StoreProduct.js"; 

import productRoutes from "./routes/products.js";
import storeRoutes from "./routes/store.js";    
import storeProductRoutes from "./routes/storeProduct.js"; 

import connectDB from './config/mongodb.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import https from 'https';
import fs from 'fs';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const port = process.env.PORT || 3000;
connectDB(); 

const app = express();
app.use(express.json());
app.use(cors({
    origin: [
        'https://localhost:5173',
        'https://127.0.0.1:5173'
    ],
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
    allowedHeaders: [
        "Content-Type",
        'Authorization',
        'Cache-Control',
        'Expires',
        'Pragma'
    ],
    credentials: true,
  }));
app.use(cookieParser());

const staticPath = path.join(__dirname, 'uploads');
app.use('/uploads', express.static(staticPath));


mongoose.connection.once('open', () => {
  console.log('MongoDB connection open, creating indexes...');
  Store.collection.createIndex({ location: "2dsphere" })
    .then(() => console.log('2dsphere index created on Store model'))
    .catch(err => console.error('Error creating 2dsphere index on Store:', err));

  StoreProduct.collection.createIndex({ productId: 1, storeId: 1 }, { unique: true })
    .then(() => console.log('Unique index created on StoreProduct model (productId, storeId)'))
    .catch(err => console.error('Error creating unique index on StoreProduct:', err));
});


app.use('/auth', userrouter);
app.use('/api/profile', profilerouter);

app.use("/api/products", productRoutes);


app.use("/api/stores", storeRoutes);
app.use("/api/store-products", storeProductRoutes);


const httpsOptions = {
  key: fs.readFileSync(path.join(__dirname, 'localhost+1-key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'localhost+1.pem'))
};

https.createServer(httpsOptions, app).listen(port, () => {
    console.log(`HTTPS Server is running on port ${port}`);
});
