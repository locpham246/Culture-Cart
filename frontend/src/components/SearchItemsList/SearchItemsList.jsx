

import React, { useState, useEffect } from "react";
import "./SearchItemsList.scss";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from 'axios';

const Collection = ({
  itemsPerPage = 7,
  title = "Search Results",
  showArrows,
  customStyles = {},
  category,
  searchQuery 
}) => {
  const [fetchedProductSummaries, setFetchedProductSummaries] = useState([]);
  const [displayedItems, setDisplayedItems] = useState([]);
  const [remainingItems, setRemainingItems] = useState([]);
  const [historyStack, setHistoryStack] = useState([]);
  
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProductSummaries = async () => {
      try {
        const response = await axios.get('https://localhost:3000/api/store-products/search-summary', {
          params: {
            category: category,
            search: searchQuery 
          }
        });
        
        if (response.data.success) {
          console.log('Fetched product summaries:', response.data.productSummaries);
          setFetchedProductSummaries(response.data.productSummaries);
        } else {
          console.error("Failed to fetch product summaries:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching product summaries:", error);
      }
    };

    fetchProductSummaries();
  }, [category, searchQuery]); 

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
  useEffect(() => {
    if (fetchedProductSummaries.length > 0) {
      const randomizedItems = shuffleArray(fetchedProductSummaries);
      setDisplayedItems(randomizedItems.slice(0, itemsPerPage));
      setRemainingItems(randomizedItems.slice(itemsPerPage));
    } else {
        setDisplayedItems([]); 
        setRemainingItems([]);
    }
  }, [fetchedProductSummaries, itemsPerPage]);
  const shiftLeft = () => {
    if (historyStack.length === 0) return;
    const restoredItem = historyStack[historyStack.length - 1];
    const removedItem = displayedItems[0];

    setDisplayedItems([...displayedItems.slice(1), restoredItem]);
    setRemainingItems((prev) => [removedItem, ...prev]);
    setHistoryStack((prev) => prev.slice(0, -1));
  };

  const shiftRight = () => {
    if (remainingItems.length === 0) return;
    const newItem = remainingItems[0];
    const updatedRemaining = remainingItems.slice(1);
    const removedItem = displayedItems[displayedItems.length - 1];

    setDisplayedItems([newItem, ...displayedItems.slice(0, -1)]);
    setRemainingItems([...updatedRemaining, removedItem]);
    setHistoryStack((prev) => [...prev, removedItem]);
  };
  return (
    <div className="search-Collection" style={customStyles}>
      {title && <h1 className="search-header">{title}</h1>}
      <div className="search-arrowContainer">
        {showArrows && (
          <button className="search-arrow left" onClick={shiftLeft}>
            &#10094;
          </button>
        )}
        <div className="search-collectionCard">
          {displayedItems.map((item) => (
            <div className="search-collectionItem" key={item._id}>
              <Link to={`/product-details/${item._id}`} className="search-itemLink"> 
                <div className="search-collectionImg">
                  <img src={item.images && item.images.length > 0 ? item.images[0] : 'placeholder.png'} alt={item.name} />
                </div>
                <p className="search-itemName">{item.name}</p>
                <p className="search-itemPrice">
                  {item.minPrice.toFixed(2) === item.maxPrice.toFixed(2) ?`$${item.minPrice.toFixed(2)}` :`$${item.minPrice.toFixed(2)} - $${item.maxPrice.toFixed(2)}` }
                  </p>
              </Link>
            </div>
          ))}
        </div>
        {showArrows && (
          <button className="search-arrow right" onClick={shiftRight}>
            &#10095;
          </button>
        )}
      </div>
    </div>
  );
};

export default Collection;