// import "./app.scss";
// import HomePage from "./pages/Home";
// import SignInPage from "./pages/SignIn";
// import SignUpPage from "./pages/SignUp";
// import ProfilePage from "./pages/Profile";
// import CartPage from "./pages/Cart";
// import React from "react";
// // import ForgotPage from "./pages/Forgot";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// function App() {
//   return (
//     <div className="App">
//       <Router>
//         <Routes>
//           <Route path="/" element={<HomePage />} /> 
//           <Route path="/signin" element={<SignInPage />} />
//           <Route path="/signup" element={<SignUpPage />} />
//           <Route path="/profile" element={<ProfilePage />} />
//           <Route path="/cart" element={<CartPage />} />
//          {/* <Route path="/forgot-password" element={<ForgotPage />} /> */}
//         </Routes>
//       </Router>
//     </div>
//   );
// }

// export default App;
import "./app.scss";
import HomePage from "./pages/Home";
import SignInPage from "./pages/SignIn";
import SignUpPage from "./pages/SignUp";
import ProfilePage from "./pages/Profile";
import SearchPage from "./pages/Search";
import CartPage from "./pages/Cart";
import ProductPage from "./pages/Product";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./store/userSlice";  // import setUser từ Redux
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const dispatch = useDispatch();  // khởi tạo dispatch để dispatch actions

  useEffect(() => {
    const token = localStorage.getItem("authToken");  // lấy token từ localStorage
    if (token) {
      const user = { name: "Sample User" }; // Bạn có thể gọi API để lấy thông tin người dùng từ server nếu cần
      dispatch(setUser({ user, token }));  // Dispatch action để lưu thông tin người dùng vào Redux store
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
          <Route path="/product" element={<ProductPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;


