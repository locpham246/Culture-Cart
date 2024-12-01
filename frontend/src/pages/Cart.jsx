import Lines from "../components/ScreenLines/Lines";
import SmallHeader from "../components/SmallHeader/SmallHeader";
import Menu from "../components/Menu/Menu";
import React, { useState } from "react";
import "./Cart.scss";
import item1 from "../assets/images/item1.png";
import item11 from "../assets/images/item11.png";

export default function Cart() {
    const [Items, setItems] = useState([
        { id: 1, name: "Shin Noodles", price: 12.99, quantity: 1, category: "Snacks", image: item1 },
        { id: 2, name: "Priya Wheat Rawa Banku Mix Flour", price: 3.49, quantity: 2, category: "Grains", image: item11 },
    ]);

    const calculateTotal = () => {
        return Items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    const updateQuantity = (id, increment) => {
        setItems(prevItems =>
            prevItems.map(item =>
                item.id === id
                    ? { ...item, quantity: Math.max(item.quantity + increment, 0) }
                    : item
            )
        );
    };

    const removeItem = id => {
        setItems(prevItems => prevItems.filter(item => item.id !== id));
    };

    return (
        <div className="Cart">
            <SmallHeader />
            <Lines />
            <Menu />
            <div className="cart-container">
                <div className="cart-items-section">
                    <h1 className="section-title">Your Cart</h1>
                    <div className="cart-categories">
                        {Items.length > 0 ? (
                            Items.map(item => (
                                <div className="cart-item" key={item.id}>
                                    <div className="item-image">
                                        <img src={item.image} alt={item.name} />
                                    </div>
                                    <div className="item-info">
                                        <h2 className="item-name">{item.name}</h2>
                                        <p className="item-category">{item.category}</p>
                                    </div>
                                    <div className="item-details">
                                        <p className="item-price">${item.price.toFixed(2)}</p>
                                        <div className="item-quantity">
                                            <button
                                                onClick={() => updateQuantity(item.id, -1)}
                                                disabled={item.quantity === 0}
                                            >
                                                -
                                            </button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                                        </div>
                                        <button
                                            className="remove-item"
                                            onClick={() => removeItem(item.id)}
                                        >
                                            &times;
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="empty-cart">Your cart is empty.</p>
                        )}
                    </div>
                </div>
                <div className="cart-summary-section">
                    <h2>Your Cart Summary</h2>
                    <div className="summary-details">
                        {Items.map(item => (
                            <div className="summary-item" key={item.id}>
                                <p>{item.name}</p>
                                <p>${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                        ))}
                        <div className="summary-total">
                            <p>Subtotal:</p>
                            <p>${calculateTotal()}</p>
                        </div>
                    </div>
                    <button className="checkout-button">Place Order Now</button>
                </div>
            </div>
        </div>
    );
}
