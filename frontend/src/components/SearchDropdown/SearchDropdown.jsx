import React from "react";

const SearchDropdown = ({ items, onItemClick }) => {
  if (!items || items.length === 0) {
    return <div className="searchDropdown">No results found</div>;
  }

  return (
    <div className="searchDropdown">
      {items.map((item) => (
        <div
          key={item._id}
          className="dropdownItem"
          onClick={() => onItemClick(item)}
        >
          {/* <img src={item.image} alt={item.name} className="itemImage" /> */}
          <p className="itemName">{item.name}</p>
        </div>
      ))}
    </div>
  );
};

export default SearchDropdown;
