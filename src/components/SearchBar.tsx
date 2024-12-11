import React from 'react';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Search by Keyword"
        value={searchTerm}  // Controlled input
        onChange={(e) => onSearchChange(e.target.value)}  // Pass the updated search term
        className="search-bar"
      />
    </div>
  );
};

export default SearchBar;
