import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faStore, faUserCircle, faClock } from "@fortawesome/free-solid-svg-icons";
import "./SearchMenu.scss";

const SearchMenu = () => {
  return (
    <div className="search-menu-container">
      <div className="search-side-menu">
        <ul className="search-menu-links">
          <li>
            <a href="/">
              <FontAwesomeIcon icon={faHome} className="search-menu-icon" />
              Home
            </a>
          </li>
          <li>
            <a href="/asian">
              <FontAwesomeIcon icon={faStore} className="search-menu-icon" />
              Asian
            </a>
          </li>
          <li>
            <a href="/hispanic">
              <FontAwesomeIcon icon={faStore} className="search-menu-icon" />
              Hispanic
            </a>
          </li>
          <li>
            <a href="/african">
              <FontAwesomeIcon icon={faStore} className="search-menu-icon" />
              African
            </a>
          </li>
        </ul>
        <ul className="search-menu-links spaced-section">
          <li>
            <a href="/profile">
              <FontAwesomeIcon icon={faUserCircle} className="search-menu-icon" />
              Account
            </a>
          </li>
          <li>
            <a href="/order-history">
              <FontAwesomeIcon icon={faClock} className="search-menu-icon" />
              Order History
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SearchMenu;
