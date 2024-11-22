import Lines from "../components/ScreenLines/Lines";
import SmallHeader from "../components/SmallHeader/SmallHeader";
import React, { useState } from "react";
import "./Cart.scss";


export default function Cart() {
    const [Items, setItems] = useState([
        { id: 1, name: "Shin Noodles", price: 12.99, quantity: 1},
        { id: 2, name: "Priya Wheat Rawa Banku Mix Flour", price: 3.49, quantity: 2},
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

    return (
        <div className="Cart">
            <SmallHeader />
            <Lines />
            <h1>Your Cart</h1>
            <div className="cart-items">
                {Items.length > 0 ? (
                    Items.map(item => (
                        <div className="cart-item" key={item.id}>
                            <p className="item-name">{item.name}</p>
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
                        </div>
                    ))
                ) : (
                    <p className="empty-cart">Your cart is empty.</p>
                )}
            </div>
            <div className="cart-summary">
                <h2>Total: ${calculateTotal()}</h2>
                <button className="checkout-button">Proceed to Checkout</button>
            </div>
        </div>
    );
}