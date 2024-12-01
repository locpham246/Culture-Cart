import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/userSlice"; // Action để đăng xuất
import "./Header.scss";
import SearchIcon from "@mui/icons-material/Search";
import blackLogo from "../../assets/images/blackLogo.webp";
import signinImage from "../../assets/images/SignIn.png";
import signupImage from "../../assets/images/SignUp.png";
import logoImage from "../../assets/images/Logo.png";

const Header = () => {
  const user = useSelector((state) => state.user.user); // Lấy trạng thái user từ Redux
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());  // Gửi action logout để cập nhật Redux store
    alert("You have been logged out.");  
  };

  // State for managing search query
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);  // Update search query on input change
  };

  return (
    <div className="header">
      <nav>
        <div className="logoContainer">
          <a href="/">
            <img src={logoImage} alt="Logo" className="logoImage" />
          </a>
        </div>
        <div className="right">
          {user ? (
            <div className="userActions">
              <span>Welcome, {user.name || "User"}!</span>
              <button onClick={handleLogout} className="logoutButton">
                Log Out
              </button>
            </div>
          ) : (
            <>
              <a href="/signin">
                <img src={signinImage} alt="Sign In" />
              </a>
              <a href="/signup">
                <img src={signupImage} alt="Sign Up" />
              </a>
            </>
          )}
        </div>
      </nav>

      <div className="headerContent">
        <h4 className="logo">Culture Cart</h4>
        <div className="input">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <SearchIcon className="searchIcon" />
        </div>
      </div>
    </div>
  );
};

export default Header;
