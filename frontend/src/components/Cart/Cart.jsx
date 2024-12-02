import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import "./CartIcon.scss";

const CartIcon = ({ itemCount = 0 }) => {
  return (
    <div className="cart-icon">
      <FontAwesomeIcon icon={faShoppingCart} className="icon" />
      {itemCount > 0 && <span className="item-count">{itemCount}</span>}
    </div>
  );
};

export default CartIcon;
