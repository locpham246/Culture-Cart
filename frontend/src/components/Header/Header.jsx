import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/userSlice";
import "./Header.scss";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import blackLogo from "../../assets/images/blackLogo.webp";
import signinImage from "../../assets/images/SignIn.png";
import signupImage from "../../assets/images/SignUp.png";
import logoImage from "../../assets/images/Logo.png";
import SearchDropdown from "../SearchDropdown/SearchDropdown.jsx";

const Header = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleLogout = () => {
    dispatch(logout());
    alert("You have been logged out.");
  };

  const handleSearchChange = async (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    if (query.length > 2) {
        try {
            const response = await axios.get(
                `http://localhost:3000/api/items/search?q=${query}`
            );
            console.log('Search results:', response.data); 
            setSearchResults(response.data);
        } catch (err) {
            console.error("Error fetching search results:", err);
        }
    } else {
        setSearchResults([]);
    }
};

  const handleItemClick = (item) => {
    window.location.href = `/product/${item._id}`;
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
        {searchQuery && (
          <SearchDropdown items={searchResults} onItemClick={handleItemClick} />
        )}
      </div>
    </div>
  );
};

export default Header;
