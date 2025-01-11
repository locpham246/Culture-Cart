import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import { UserRouter } from './routes/user.js';
import cookieParser from 'cookie-parser';
import productRoute from "./routes/products.routes.js";
import product1Routes from "./routes/products1.routes.js";
// import cartRoutes from "./routes/cart.routes.js";

dotenv.config();  


const mongoUri = process.env.MONGO_URI;
const port = process.env.PORT;


const app = express();
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'], 
    credentials: true, 
  }));
app.use(cookieParser()); 

app.use('/auth', UserRouter);  

mongoose.connect(mongoUri)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Failed to connect to MongoDB:", err));

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
});

app.use("/products", productRoute)
app.use("/product1", product1Routes); 
// app.use("/cart", cartRoutes);
