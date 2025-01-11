import React, { useState, useEffect } from "react";
import "./SearchItemsList.scss";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

const Collection = ({
  items = [],
  itemsPerPage = 7,
  title = "Search Results",
  showArrows,
  customStyles = {},
  category,
  discount,
  recommended,
}) => {
  const [fetchedItems, setFetchedItems] = useState([]);
  const [displayedItems, setDisplayedItems] = useState([]);
  const [remainingItems, setRemainingItems] = useState([]);
  const [historyStack, setHistoryStack] = useState([]);
  
  const dispatch = useDispatch();

 
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/products');
        const data = await response.json();
        console.log('Fetched products:', data);
        setFetchedItems(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Shuffle array function
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // Filter and shuffle items
  useEffect(() => {
    if (fetchedItems.length > 0) {
      const filteredItems = fetchedItems.filter((item) => {
        if (category && item.category !== category) return false;
        if (recommended && !item.recommended) return false;
        if (discount && !item.discount) return false;
        return true;
      });

      const randomizedItems = shuffleArray(filteredItems);
      setDisplayedItems(randomizedItems.slice(0, itemsPerPage));
      setRemainingItems(randomizedItems.slice(itemsPerPage));
    }
  }, [fetchedItems, category, discount, recommended]);


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
            <div className="search-collectionItem" key={item.id}>
              <Link to={`/product/${item.id}`} className="search-itemLink">
                <div className="search-collectionImg">
                  <img src={item.src} alt={item.name} />
                </div>
                <p className="search-itemName">{item.name}</p>
                <p className="search-itemPrice">{item.price}</p>
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
