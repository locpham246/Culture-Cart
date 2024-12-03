import "./app.scss";
import HomePage from "./pages/Home";
import SignInPage from "./pages/SignIn";
import SignUpPage from "./pages/SignUp";
import ProfilePage from "./pages/Profile";
import SearchPage from "./pages/Search";
import CartPage from "./pages/Cart";
import ProductPage from "./pages/Product";
import DeliveryOrderPage from "./pages/DeliveryOrder";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./store/userSlice"; 
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const user = { name: "Sample User" }; 
      dispatch(setUser({ user, token }));
    }
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/delivery_order" element={<DeliveryOrderPage />} /> 
          {/* <Route path="/driver_deliveries" element={<DriverDeliveriesPage />} /> */}
          {/* <Route path="/driver_order" element={<DriverOrderPage />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;

