import React, { useState } from 'react';
import './SearchBar.css'; 

const SearchBar = ({ setSearchQuery }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setSearchQuery(inputValue);
  };

  return (
    <form onSubmit={handleSearchSubmit}>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search movies..."
          className="search-input"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button type="submit" className="search-button">Search</button>
      </div>
    </form>
  );
};

export default SearchBar;
