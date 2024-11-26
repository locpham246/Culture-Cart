import "./app.scss";
import HomePage from "./pages/Home"
import SignInPage from "./pages/SignIn";
import SignUpPage from "./pages/SignUp";
import ProfilePage from "./pages/Profile";
import SearchPage from "./pages/Search";
import CartPage from "./pages/Cart";
import ProductPage from "./pages/Product";
import OrderPage from "./pages/DeliveryOrder";
import DriverDeliveriesPage from "./pages/DriverDeliveries";
import DriverOrderPage from "./pages/DriverOrder";

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/delivery_order" element={<OrderPage />} />
          <Route path="/driver_deliveries" element={<DriverDeliveriesPage />} />
          <Route path="/driver_order" element={<DriverOrderPage />} />
        </Routes>
    </Router> 
    </div>
  );
}

export default App;
