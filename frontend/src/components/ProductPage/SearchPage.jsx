import React, { useState } from 'react';

const SearchPage = ({ items }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    
    if (e.target.value) {
      const results = items.filter(item => 
        item.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setFilteredItems(results);
    } else {
      setFilteredItems([]);
    }
  };

  const handleSelectItem = (item) => {
    console.log(`Chọn item: ${item.name}`);
  };

  return (
    <div>
      <input 
        type="text" 
        placeholder="Tìm kiếm item..." 
        value={searchTerm} 
        onChange={handleSearch}
      />
      
      {filteredItems.length > 0 && (
        <div className="dropdown">
          {filteredItems.map((item) => (
            <div 
              key={item.id} 
              className="dropdown-item" 
              onClick={() => handleSelectItem(item)}
            >
              {item.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
