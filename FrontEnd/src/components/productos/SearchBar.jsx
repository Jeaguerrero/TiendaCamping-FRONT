import React, { useState } from "react";

const SearchBar = ({ setSearchQuery }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    const query = e.target.value;
    setInputValue(query);
    setSearchQuery(query);
  };

  return (
    <div className="search-bar">
      <div className="search-input-container">
        <input
          type="text"
          placeholder="Buscar..."
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default SearchBar;