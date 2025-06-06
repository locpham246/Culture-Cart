

import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload; 
      const existingItem = state.items.find(item => item._id === newItem._id);

      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ ...newItem, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const idToRemove = action.payload; 
      state.items = state.items.filter(item => item._id !== idToRemove);
    },
    increaseQuantity: (state, action) => {
      const idToIncrease = action.payload;
      const item = state.items.find(item => item._id === idToIncrease);
      if (item) {
        item.quantity++;
      }
    },
    decreaseQuantity: (state, action) => {
      const idToDecrease = action.payload;
      const item = state.items.find(item => item._id === idToDecrease);
      if (item && item.quantity > 1) {
        item.quantity--;
      } else if (item && item.quantity === 1) {
        state.items = state.items.filter(item => item._id !== idToDecrease);
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;