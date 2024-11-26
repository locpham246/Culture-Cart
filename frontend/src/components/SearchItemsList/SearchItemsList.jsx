import React, { useState } from "react";
import "./SearchItemsList.scss";
import item1 from "../../assets/images/item1.png";
import item2 from "../../assets/images/item2.png";
import item3 from "../../assets/images/item3.png";
import item4 from "../../assets/images/item4.png";
import item5 from "../../assets/images/item5.png";
import item6 from "../../assets/images/item6.png";
import item7 from "../../assets/images/item7.png";
import item8 from "../../assets/images/item8.png";
import item9 from "../../assets/images/item9.png";
import item10 from "../../assets/images/item10.png";
import item11 from "../../assets/images/item11.png";

const Collection = ({
  items = [],
  itemsPerPage = 7, 
  title = "Search Results",
  showArrows = true,
  customStyles = {},
  category,
}) => {
  const allItems = items.length > 0 ? items : [
    { src: item1, name: "Shin Noodles", price: "$12.99", category: "asian" },
    { src: item2, name: "Mama la Beef Pho Broth Concentrate", price: "$8.50", category: "asian" },
    { src: item3, name: "Do Ghazal Pure Ceylon Tea", price: "$5.00", category: "african" },
    { src: item4, name: "Halva Pistachio Cortas", price: "$7.99", category: "hipanic" },
    { src: item5, name: "Priya Wheat Rawa Banku Mix Flour", price: "$3.49", category: "hispanic" },
    { src: item6, name: "Shin Light Noodles", price: "$11.00", category: "asian" },
    { src: item7, name: "Sweet and Sour Tamarind", price: "$4.99", category: "asian" },
    { src: item8, name: "Chakki Atta Whole Wheat Flour", price: "$6.25", category: "hispanic" },
    { src: item9, name: "Ziyad Brothers Ziyad Halva", price: "$9.80", category: "african" },
    { src: item10, name: "Haldiram's Karachi Halwa", price: "$10.99", category: "african" },
    { src: item11, name: "Daawat - Extra Long Basmati Rice", price: "$15.99", category: "african" },
  ];

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const randomizedItems = shuffleArray(allItems);

  const filteredItems = category ? allItems.filter(item => item.category === category) : randomizedItems;

  const [displayedItems, setDisplayedItems] = useState(filteredItems.slice(0, itemsPerPage));
  const [remainingItems, setRemainingItems] = useState(filteredItems.slice(itemsPerPage));
  const [historyStack, setHistoryStack] = useState([]);


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
      <div className="search-arrowContainer" style={{ display: showArrows ? "flex" : "none" }}>
        <button className="search-arrow left" onClick={shiftLeft}>&#10094;</button>
        <div className="search-collectionCard">
          {displayedItems.map((item, index) => (
            <div className="search-collectionItem" key={index}>
              <div className="search-collectionImg">
                <img src={item.src} alt={item.name} />
              </div>
              <p className="search-itemName">{item.name}</p>
              <p className="search-itemPrice">{item.price}</p>
            </div>
          ))}
        </div>
        <button className="search-arrow right" onClick={shiftRight}>&#10095;</button>
      </div>
    </div>
  );
};

export default Collection;
