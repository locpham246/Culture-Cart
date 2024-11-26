import logoImage from "../../assets/images/Logo.png"; 
import cartImage from "../../assets/images/Cart.png";
import React from "react";
import "./SmallHeader.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faBell,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    <header className="app-header">
      {/* Logo Icon */}
      <div className="search-logo">
        <a href="/">
          <img src={logoImage} alt="Logo" />
        </a>
      </div>

      {/* Centered Search Bar */}
      <div className="search-bar">
        <FontAwesomeIcon icon={faSearch} />
        <input type="text" placeholder="Search" />
      </div>

      {/* Icons Section */}
      <div className="icon-group">
        {/* Cart Icon */}
        <div className="cart-button">
          <a href="/cart">
            <img src={cartImage} alt="Cart" />
          </a>
        </div>

        {/* Notification Button */}
        <button className="notification-button">
          <FontAwesomeIcon icon={faBell} />
        </button>

        {/* Profile Button */}
        <button className="profile-button">
          <FontAwesomeIcon icon={faUserCircle} />
        </button>
      </div>
    </header>
  );
};

export default Header;
