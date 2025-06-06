import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/userSlice";
import "./Header.scss";
import SearchIcon from "@mui/icons-material/Search";
import logoImage from "../../assets/images/Logo.png";
import signinImage from "../../assets/images/SignIn.png";
import signupImage from "../../assets/images/SignUp.png";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const Header = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null); 

  useEffect(() => {
    const handleClickOutside = (event) => {

      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]); 

  const handleLogout = () => {
    axios.post("https://localhost:3000/auth/signout", {}, { withCredentials: true })
        .then(response => {
            if (response.data.success) {
                dispatch(logout());
                alert(response.data.message);
                navigate("/signin");
            } else {
                alert(response.data.message || "Logout failed.");
            }
        })
        .catch(error => {
            console.error("Logout error:", error);
            alert("An error occurred during logout.");
        });
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleWelcomeClick = () => {
    setShowDropdown(prev => !prev);
  };

  const handleDropdownItemClick = () => {
    setShowDropdown(false);
  };

  return (
    <div className="header">
      <nav>
        <div className="logoContainer">
          <Link to="/">
            <img src={logoImage} alt="Logo" className="logoImage" />
          </Link>
        </div>
        <div className="right">
          {user ? (
            <div className="userActions">
              <div
                className="welcome-dropdown-container"
                ref={dropdownRef} 
              >
                <span className="welcomeMessage" onClick={handleWelcomeClick}> 
                  Welcome, {user.name}!
                </span>
                {showDropdown && (
                  <div className="dropdown-menu">
                    <Link to="/profile" onClick={handleDropdownItemClick}>Profile</Link>
                    <Link to="/search" onClick={handleDropdownItemClick}>Search Page</Link>
                  </div>
                )}
              </div>
              <button onClick={handleLogout} className="logoutButton">
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/signin">
                <img src={signinImage} alt="Sign In" />
              </Link>
              <Link to="/signup">
                <img src={signupImage} alt="Sign Up" />
              </Link>
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