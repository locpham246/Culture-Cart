// frontend/src/App.jsx

import "./app.scss";
import HomePage from "./pages/Home";
import SignInPage from "./pages/SignIn"; 
import SignUpPage from "./pages/SignUp";
import ProfilePage from "./pages/Profile";
import SearchPage from "./pages/Search";
import CartPage from "./pages/Cart";
import ProductPage from "./pages/Product";
import DeliveryOrderPage from "./pages/DeliveryOrder";
import OTPVerify from "./pages/OTPVerify";
import ForgotPasswordPage from './pages/ForgotPassword';

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, logout } from "./redux/userSlice";
import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import ManageAccount from "./pages/ManageAccount"; 
import Wallet from "./pages/Wallet";             

import StoresPage from "./pages/StoresPage";
import StoreProductsPage from "./pages/StoreProductsPage";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'https://localhost:3000';

function AppContent() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuthStatus = async () => {
        try {
            const response = await axios.get("/auth/userdata", {
                withCredentials: true
            });

            if (response.data.success) {
                dispatch(setUser(response.data.userData));
                console.log("User data received from backend and dispatched:", response.data.userData);
            } else {
                dispatch(logout());

                const protectedPaths = ['/profile', '/manage-account', '/wallet'];
                if (protectedPaths.includes(location.pathname)) {
                    navigate('/signin');
                }
            }
        } catch (error) {
            console.error("Error checking auth status:", error);
            dispatch(logout());

            const protectedPaths = ['/profile', '/manage-account', '/wallet'];
            if (protectedPaths.includes(location.pathname)) {
                navigate('/signin');
            }
        }
    };

    if (!user || !user._id) {
        checkAuthStatus();
    }
  }, [dispatch, user, navigate, location.pathname]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />


        <Route path="/profile" element={user ? <ProfilePage /> : <SignInPage />} />
        <Route path="/manage-account" element={user ? <ManageAccount /> : <SignInPage />} /> 
        <Route path="/wallet" element={user ? <Wallet /> : <SignInPage />} />             

        <Route path="/search" element={<SearchPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/product-details/:id" element={<ProductPage />} />
        <Route path="/verify-otp/:userId" element={<OTPVerify />} />
        <Route path="/delivery_order" element={<DeliveryOrderPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/stores" element={<StoresPage />} /> {/* Trang danh sách cửa hàng */}
        <Route path="/stores/:storeId/products" element={<StoreProductsPage />} />
        
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <AppContent />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;