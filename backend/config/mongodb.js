import mongoose from "mongoose"; 

const connectDB = async () => {
    mongoose.connection.on('connected', () => console.log("Connected to MongoDB"));
    mongoose.connection.on('error', (err) => console.error("DB error", err));
    await mongoose.connect(process.env.MONGO_URI); 
  };
  
  export default connectDB;