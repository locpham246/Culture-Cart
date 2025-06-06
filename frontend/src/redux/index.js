import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import productSliceReducer from './productSlice'; 


const store = configureStore({
  reducer: {
    user: userReducer,
    product: productSliceReducer,
  },
});

export default store;
