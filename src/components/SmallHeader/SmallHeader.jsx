import logoImage from "../../assets/images/Logo.png";
import React from "react";
import "./SmallHeader.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faSearch,
  faBell,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    <header className="app-header">
      {/* Menu Button */}
      <button className="menu-button">
        <FontAwesomeIcon icon={faBars} />
      </button>

      {/* Cart Icon */}
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

      {/* Notification Button */}
      <button className="notification-button">
        <FontAwesomeIcon icon={faBell} />
      </button>

      {/* Profile Button */}
      <button className="profile-button">
        <FontAwesomeIcon icon={faUserCircle} />
      </button>
    </header>
  );
};

export default Header;
