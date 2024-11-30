// ItemDetails.jsx
import React, { useState } from "react";
import "./ItemDetails.scss";

const ItemDetails = ({ item = {} }) => {
  // Fallback values to handle undefined or missing data
  const {
    companyName = "N/A",
    name = "Product Name",
    price = 0,
    inStock = false,
    weights = [],
    description = "No description available",
    images = [],
  } = item;

  // Safely select the first image or use a placeholder
  const mainImage = images[0] || "path_to_placeholder_image.jpg";

  return (
    <div className="item-details">
      <h1>{companyName}</h1>

      <div className="product">
        {/* Product Images Section */}
        <div className="product-images">
          <img className="main-image" src={mainImage} alt={name} />
          <div className="image-thumbnails">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${name} thumbnail ${index}`}
              />
            ))}
          </div>
        </div>

        {/* Product Info Section */}
        <div className="product-info">
          <h2>{name}</h2>
          <p className="price">Price: ${price.toFixed(2)}</p>
          <p className="stock">In Stock: {inStock ? "Yes" : "No"}</p>

          {/* Weight Selection */}
          <div className="weight-selection">
            <p>Weight:</p>
            <div className="weights">
              {weights.length > 0 ? (
                weights.map((weight, index) => (
                  <button key={index}>{weight} lbs</button>
                ))
              ) : (
                <p>No weights available</p>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="actions">
            <button className="add-to-cart">Add to cart</button>
            <button className="buy-now">Buy now</button>
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="additional-info">
        <h3>About this item:</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default ItemDetails;
