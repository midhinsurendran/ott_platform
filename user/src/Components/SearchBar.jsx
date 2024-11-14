import React from 'react';
import './SearchBar.css';  // Import the CSS file

const SearchBar = () => {
  return (
    <form>
      <div className="search-bar">
        <input type="text" placeholder="Search movies..." className="search-input" />
        <button type="submit" className="search-button">Search</button>
      </div>
    </form>
  );
};

export default SearchBar;
