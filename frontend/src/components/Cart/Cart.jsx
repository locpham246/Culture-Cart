
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, increaseQuantity, decreaseQuantity } from '../../redux/cartSlice';
import './Cart.scss'; 

const CartComponent = () => {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    const currentItem = cartItems.find(item => item._id === itemId);

    if (!currentItem) return; 

    if (newQuantity > currentItem.quantity) {
      dispatch(increaseQuantity(itemId));
    } else if (newQuantity < currentItem.quantity) {
      
      if (newQuantity < 1) {
        dispatch(removeFromCart(itemId));
      } else {
        dispatch(decreaseQuantity(itemId));
      }
    }
    
  };


  return (
    <div className="cart-container">
      <h1>Your Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <p className="empty-cart-message">Your cart is empty. Start shopping now!</p>
      ) : (
        <div className="cart-content">
          <div className="cart-items-list">
            {cartItems.map(item => (
              <div className="cart-item" key={item._id}> 
                <div className="item-details">
                  <img src={item.images && item.images.length > 0 ? item.images[0] : 'placeholder.png'} alt={item.name} className="item-image" />
                  <div className="item-info">
                    <span className="item-name">{item.name}</span>
                    <span className="item-price">${item.price.toFixed(2)}</span>
                  </div>
                </div>
                <div className="item-actions">
                  <div className="quantity-control">
                    <button onClick={() => dispatch(decreaseQuantity(item._id))}>-</button>
                    <span className="item-quantity">{item.quantity}</span>
                    <button onClick={() => dispatch(increaseQuantity(item._id))}>+</button>
                  </div>
                  <button className="remove-button" onClick={() => handleRemoveItem(item._id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>${calculateTotalPrice().toFixed(2)}</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>${calculateTotalPrice().toFixed(2)}</span>
            </div>
            <button className="checkout-button">Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartComponent;