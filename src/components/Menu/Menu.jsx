import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faSearch, faUser, faHistory, faBars } from "@fortawesome/free-solid-svg-icons";
import "./Menu.scss";

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="menu-container">
      <button className="menu-button" onClick={toggleMenu}>
        <FontAwesomeIcon icon={faBars} className="menu-icon" />
        Menu
      </button>
      <div className={`side-menu ${isOpen ? "open" : ""}`}>
        <ul className="menu-links">
          <li>
            <a href="/">
              <FontAwesomeIcon icon={faHome} className="menu-icon" />
              Home
            </a>
          </li>
          <li>
            <a href="/search">
              <FontAwesomeIcon icon={faSearch} className="menu-icon" />
              Search
            </a>
          </li>
          <li>
            <a href="/profile">
              <FontAwesomeIcon icon={faUser} className="menu-icon" />
              Profile
            </a>
          </li>
          <li>
            <a href="/history">
              <FontAwesomeIcon icon={faHistory} className="menu-icon" />
              History
            </a>
          </li>
        </ul>
      </div>
      {isOpen && <div className="overlay" onClick={toggleMenu}></div>}
    </div>
  );
};

export default Menu;
