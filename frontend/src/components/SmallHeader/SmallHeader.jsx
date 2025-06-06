import logoImage from "../../assets/images/Logo.png"; 
import React from "react";
import "./SmallHeader.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSearch, faBell,faUserCircle,faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from 'react-redux'; 

const Header = () => {
  const cartItems = useSelector(state => state.cart.items);
  const totalItemsInCart = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="app-header">
      <div className="search-logo">
        <a href="/">
          <img src={logoImage} alt="Logo" />
        </a>
      </div>
      <div className="search-bar">
        <FontAwesomeIcon icon={faSearch} />
        <input type="text" placeholder="Search" />
      </div>
      <div className="icon-group">
        <div className="cart-button">
          <a href="/cart">
            <FontAwesomeIcon className="cart-icon" icon={faShoppingCart} />
            {totalItemsInCart > 0 && (
              <span className="cart-count">{totalItemsInCart}</span>
            )}
          </a>
        </div>

        <button className="notification-button">
          <FontAwesomeIcon icon={faBell} />
        </button>

        <button className="profile-button">
          <FontAwesomeIcon icon={faUserCircle} />
        </button>
      </div>
    </header>
  );
};

export default Header;