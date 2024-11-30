import React, { useState } from "react";
import "./ItemsList.scss";
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
import item12 from "../../assets/images/item12.png";
import item13 from "../../assets/images/item13.png";
import item14 from "../../assets/images/item14.png";
import item15 from "../../assets/images/item15.png";
import item16 from "../../assets/images/item16.png";
import item17 from "../../assets/images/item17.png";
import item18 from "../../assets/images/item18.png";
import item19 from "../../assets/images/item19.png";
import item20 from "../../assets/images/item20.png";
import item21 from "../../assets/images/item21.png";
import item22 from "../../assets/images/item22.png";
import item23 from "../../assets/images/item23.png";
import item24 from "../../assets/images/item24.png";
import item25 from "../../assets/images/item25.png";
import item26 from "../../assets/images/item26.png";
import item27 from "../../assets/images/item27.png";
import item28 from "../../assets/images/item28.png";
import item29 from "../../assets/images/item29.png";
import item30 from "../../assets/images/item30.png";

const Collection = ({
  items = [],
  itemsPerPage = 6,
  gridColumns = 6,
  title = "Search Results",
  showArrows = true,
  customStyles = {},
}) => {
  const allItems = items.length > 0 ? items : [
    { src: item1, name: "Shin Noodles", price: "$12.99" },
    { src: item2, name: "Mama la Beef Pho Broth Concentrate", price: "$8.50" },
    { src: item3, name: "Do Ghazal Pure Ceylon Tea", price: "$5.00" },
    { src: item4, name: "Halva Pistachio Cortas", price: "$7.99" },
    { src: item5, name: "Priya Wheat Rawa Banku Mix Flour", price: "$3.49" },
    { src: item6, name: "Shin Light Noodles", price: "$11.00" },
    { src: item7, name: "Sweet and Sour Tamarind", price: "$4.99" },
    { src: item8, name: "Chakki Atta Whole Wheat Flour", price: "$6.25" },
    { src: item9, name: "Ziyad Brothers Ziyad Halva", price: "$9.80" },
    { src: item10, name: "Haldiram's Karachi Halwa", price: "$10.99" },
    { src: item11, name: "Daawat - Extra Long Basmati Rice", price: "$15.99" },
    { src: item12, name: "Goya Adobo Seasoning", price: "$10.70", category: "hispanic" },
    { src: item13, name: "Costeña Chipotle Peppers in Adobo Sauce", price: "$6.99", category: "hispanic" },
    { src: item14, name: "Maseca Instant Corn Masa Flour", price: "$4.49", category: "hispanic" },
    { src: item15, name: "Tajin Clásico Seasoning", price: "$5.95", category: "hispanic" },
    { src: item16, name: "Goya Black Beans", price: "$3.99", category: "hispanic" },
    { src: item17, name: "Herdez Salsa Verde", price: "$4.99", category: "hispanic" },
    { src: item18, name: "Guava Paste", price: "$5.80", category: "hispanic" },
    { src: item19, name: "Nopalitos (Cactus)", price: "$6.99", category: "hispanic" },
    { src: item20, name: "Dulce de Leche", price: "$2.99", category: "hispanic" },
    { src: item21, name: "ChocoMilk Chocolate Drink Mix", price: "$3.49", category: "hispanic" },
    { src: item22, name: "Dried Chili Peppers (Ancho, Guajillo, Pasilla)", price: "$6.99", category: "hispanic" },
    { src: item23, name: "El Milagro Corn Tortillas", price: "$5.30", category: "hispanic" },
    { src: item24, name: "Plaintain Fufu Flour 24oz.", price: "$12.99", category: "african" },
    { src: item25, name: "Egusi Whole Melon Seeds", price: "$7.49", category: "african" },
    { src: item26, name: "Ola Ola Pounded Yam", price: "$6.99", category: "african" },
    { src: item27, name: "Maggi Seasoning Cubes", price: "$3.30", category: "african" },
    { src: item28, name: "Underwood Siracha Sauce", price: "$16.50", category: "asian" },
    { src: item29, name: "Kikkoman Soy Sauce, Tamari", price: "$14.49", category: "asian" },
    { src: item30, name: "Fresh Spring Rice Paper Wrappers", price: "$2.99", category: "asian" },
  ];

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const randomizedItems = shuffleArray(allItems);

  const [displayedItems, setDisplayedItems] = useState(randomizedItems.slice(0, itemsPerPage));
  const [remainingItems, setRemainingItems] = useState(randomizedItems.slice(itemsPerPage));
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
    <div className="collection searchCollection" style={customStyles}>
      {title && <h1>{title}</h1>}
      <div className="arrowContainer" style={{ display: showArrows ? "flex" : "none" }}>
        <button className="arrow left" onClick={shiftLeft}>&#10094;</button>
        <div className="collectionCard" style={{ gridTemplateColumns: `repeat(${gridColumns}, 1fr)` }}>
          {displayedItems.map((item, index) => (
            <div className="collectionItem searchItem" key={index}>
              <div className="collectionImg">
                <img src={item.src} alt={item.name} />
              </div>
              <p className="itemName">{item.name}</p>
              <p className="itemPrice">{item.price}</p>
            </div>
          ))}
        </div>
        <button className="arrow right" onClick={shiftRight}>&#10095;</button>
      </div>
    </div>
  );
};

export default Collection;
