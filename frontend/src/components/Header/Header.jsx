import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/userSlice"; // Slice quản lý user
import "./Header.scss";
import SearchIcon from "@mui/icons-material/Search";
import logoImage from "../../assets/images/Logo.png";
import signinImage from "../../assets/images/SignIn.png";
import signupImage from "../../assets/images/SignUp.png";

const Header = () => {
  const user = useSelector((state) => state.user.user); // Lấy thông tin user từ Redux store
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    alert("You have been logged out.");
  };

  // Quản lý trạng thái ô tìm kiếm
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
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
              <div className="userInfo">
                {user.avatar && (
                  <img
                    src={user.avatar}
                    alt="User Avatar"
                    className="userAvatar"
                  />
                )}
                <span className="welcomeMessage">
                   Welcome, <strong>{user.name || "User"}</strong>!
                </span>
              </div>
              <button onClick={handleLogout} className="logoutButton">
                Logout
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
