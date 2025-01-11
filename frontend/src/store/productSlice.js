import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import item1 from "../assets/images/item1.png";
import item2 from "../assets/images/item2.png";
import item3 from "../assets/images/item3.png";
import item4 from "../assets/images/item4.png";
import item5 from "../assets/images/item5.png";
import item6 from "../assets/images/item6.png";
import item7 from "../assets/images/item7.png";
import item8 from "../assets/images/item8.png";
import item9 from "../assets/images/item9.png";
import item10 from "../assets/images/item10.png";
import item11 from "../assets/images/item11.png";
import item12 from "../assets/images/item12.png";
import item13 from "../assets/images/item13.png";
import item14 from "../assets/images/item14.png";
import item15 from "../assets/images/item15.png";
import item16 from "../assets/images/item16.png";
import item17 from "../assets/images/item17.png";
import item18 from "../assets/images/item18.png";
import item19 from "../assets/images/item19.png";
import item20 from "../assets/images/item20.png";
import item21 from "../assets/images/item21.png";
import item22 from "../assets/images/item22.png";
import item23 from "../assets/images/item23.png";
import item24 from "../assets/images/item24.png";
import item25 from "../assets/images/item25.png";
import item26 from "../assets/images/item26.png";
import item27 from "../assets/images/item27.png";
import item28 from "../assets/images/item28.png";
import item29 from "../assets/images/item29.png";
import item30 from "../assets/images/item30.png";

const initialState = {
  productList: [
    { id: 1, name: "Shin Noodles", price: 12.5, companyName: "Li's Asian Market", weights: [2, 4, 6], description: "Popular Korean instant noodles", images: [item1] },
    { id: 2, name: "Mama la Beef Pho Broth Concentrate", companyName: "HongKong Seafood Market", price: 8.5, weights: [1, 5, 3, 5], description: "Concentrate for making delicious pho", images: [item2] },
    { id: 3, name: "Do Ghazal Pure Ceylon Tea", price: 5.0, weights: [3, 5, 7], description: "High-quality Ceylon tea leaves", images: [item3], companyName: "Hispanic Market" },
    { id: 4, name: "Halva Pistachio Cortas", price: 7.2, weights: [2, 4, 6, 8], description: "Delicious pistachio halva", images: [item4], companyName: "Middle East Market" },
    { id: 5, name: "Priya Wheat Rawa Banku Mix Flour", price: 3.49, weights: [1, 3, 5], description: "Perfect for African dishes", images: [item5], companyName: "African Market" },
    { id: 6, name: "Shin Light Noodles", price: 11.0, weights: [3, 5, 7], description: "A lighter version of Shin noodles", images: [item6], companyName: "HongKong Seafood Market" },
    { id: 7, name: "Sweet and Sour Tamarind", price: 4.99, weights: [2, 4, 6, 8], description: "A versatile tamarind product", images: [item7], companyName: "Hispanic Market" },
    { id: 8, name: "Chakki Atta Whole Wheat Flour", price: 6.25, weights: [1, 5, 3, 5], description: "Nutritious whole wheat flour", images: [item8], companyName: "African Market" },
    { id: 9, name: "Ziyad Brothers Ziyad Halva", price: 9.8, weights: [3, 5, 7], description: "A delightful Middle Eastern dessert", images: [item9], companyName: "Middle East Market" },
    { id: 10, name: "Haldiram's Karachi Halwa", price: 10.25, weights: [2, 4, 6], description: "Traditional Indian sweet treat", images: [item10], companyName: "Middle East Market" },
    { id: 11, name: "Daawat - Extra Long Basmati Rice", price: 15.99, weights: [1, 5, 3, 5], description: "Premium quality basmati rice", images: [item11], companyName: "Middle East Market" },
    { id: 12, name: "Goya Adobo Seasoning", price: 10.7, weights: [2, 4, 6, 8], description: "All-purpose seasoning for every dish", images: [item12], companyName: "Hispanic Market" },
    { id: 13, name: "Costeña Chipotle Peppers in Adobo Sauce", price: 6.99, weights: [3, 5, 7], description: "Spicy chipotle peppers in a rich sauce", images: [item13], companyName: "Hispanic Market" },
    { id: 14, name: "Maseca Instant Corn Masa Flour", price: 4.49, weights: [1, 3, 5], description: "Essential for authentic tortillas", images: [item14], companyName: "Hispanic Market" },
    { id: 15, name: "Tajin Clásico Seasoning", price: 5.95, weights: [2, 4, 6], description: "Tangy chili lime seasoning", images: [item15], companyName: "Hispanic Market" },
    { id: 16, name: "Goya Black Beans", price: 3.99, weights: [2, 4, 6, 8], description: "Classic black beans for every meal", images: [item16], companyName: "Hispanic Market" },
    { id: 17, name: "Herdez Salsa Verde", price: 4.99, weights: [1, 3, 5], description: "Fresh and tangy green salsa", images: [item17], companyName: "Hispanic Market" },
    { id: 18, name: "Guava Paste", price: 5.8, weights: [3, 5, 7], description: "Sweet and flavorful guava paste", images: [item18], companyName: "Hispanic Market" },
    { id: 19, name: "Nopalitos (Cactus)", price: 6.99, weights: [2, 4, 6], description: "Prepared cactus for Mexican dishes", images: [item19], companyName: "Hispanic Market" },
    { id: 20, name: "Dulce de Leche", price: 2.99, weights: [1, 3, 5], description: "Creamy caramel spread", images: [item20], companyName: "Hispanic Market" },
    { id: 21, name: "ChocoMilk Chocolate Drink Mix", price: 3.49, weights: [3, 5, 7], description: "Delicious chocolate drink mix", images: [item21], companyName: "Hispanic Market" },
    { id: 22, name: "Dried Chili Peppers", price: 6.99, weights: [2, 4, 6, 8], description: "Rich and flavorful dried chilies", images: [item22], companyName: "Hispanic Market" },
    { id: 23, name: "El Milagro Corn Tortillas", price: 5.3, weights: [1, 5, 3, 5], description: "Fresh, authentic corn tortillas", images: [item23], companyName: "Hispanic Market" },
    { id: 24, name: "Plantain Fufu Flour 24oz.", price: 12.99, weights: [2, 4, 6], description: "Perfect for making fufu", images: [item24], companyName: "African Market" },
    { id: 25, name: "Egusi Whole Melon Seeds", price: 7.49, weights: [3, 5, 7], description: "Essential for African soups", images: [item25], companyName: "African Market" },
    { id: 26, name: "Ola Ola Pounded Yam", price: 6.99, weights: [2, 4, 6, 8], description: "Traditional African staple", images: [item26], companyName: "African Market" },
    { id: 27, name: "Maggi Seasoning Cubes", price: 3.3, weights: [1, 3, 5], description: "Convenient and flavorful seasoning", images: [item27], companyName: "African Market" },
    { id: 28, name: "Underwood Siracha Sauce", price: 16.5, weights: [3, 5, 7], description: "Spicy and tangy sriracha sauce", images: [item28], companyName: "HongKong Seafood Market" },
    { id: 29, name: "Kikkoman Soy Sauce, Tamari", price: 14.49, weights: [2, 4, 6, 8], description: "Rich and savory soy sauce", images: [item29], companyName: "HongKong Seafood Market" },
    { id: 30, name: "Fresh Spring Rice Paper Wrappers", price: 2.99, weights: [1, 5, 3, 5], description: "Perfect for fresh spring rolls", images: [item30], companyName: "HongKong Seafood Market" }
    

  ],
  cartItem: [],
  selectedProduct: null,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProductList: (state, action) => {
      state.productList = [...action.payload];
    },
    addCartItem: (state, action) => {
      const check = state.cartItem.some((el) => el._id === action.payload._id);
      if (check) {
        toast("Already Item in Cart");
      } else {
        toast("Item Added successfully");
        const total = action.payload.price;
        state.cartItem = [
          ...state.cartItem,
          { ...action.payload, qty: 1, total: total },
        ];
      }
    },
    deleteCartItem: (state, action) => {
      toast("One Item Deleted");
      const index = state.cartItem.findIndex((el) => el._id === action.payload);
      state.cartItem.splice(index, 1);
    },
    increaseQty: (state, action) => {
      const index = state.cartItem.findIndex((el) => el._id === action.payload);
      let qty = state.cartItem[index].qty;
      const qtyInc = ++qty;
      state.cartItem[index].qty = qtyInc;

      const price = state.cartItem[index].price;
      const total = price * qtyInc;

      state.cartItem[index].total = total;
    },
    decreaseQty: (state, action) => {
      const index = state.cartItem.findIndex((el) => el._id === action.payload);
      let qty = state.cartItem[index].qty;
      if (qty > 1) {
        const qtyDec = --qty; 
        state.cartItem[index].qty = qtyDec;

        const price = state.cartItem[index].price;
        const total = price * qtyDec;

        state.cartItem[index].total = total;
      } else {
        toast("Cannot decrease quantity below 1");
      }
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
  },
});

export const {
  setProductList,
  setSelectedProduct,
  addCartItem,
  deleteCartItem,
  increaseQty,
  decreaseQty,
} = productSlice.actions;


export default productSlice.reducer;
