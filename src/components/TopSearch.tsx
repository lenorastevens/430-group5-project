'use client';

import { useEffect, useState } from 'react';
import { useFilter } from '@/context/FilterContext';
// import SearchBar from './SearchBar';
import LoginButton from './LoginButton';
import { BsSearch } from "react-icons/bs";

interface Category {
    category_id: number;
    category_name: string;
}

const TopSearch = () => {
  const { searchTerm, setSearchTerm, selectedCategory, setSelectedCategory } = useFilter();  // Access values from context

  const [categories, setCategories] = useState<Category[]>([]);  // State to store fetched categories
   
  // Fetch categories when the component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');  // Assuming there's an API endpoint for categories
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data);  // Update state with fetched categories
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };

    fetchCategories();
  }, []);  // Empty dependency array ensures this runs only once when the component mounts

  // Handle category selection
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryId = e.target.value ? Number(e.target.value) : ""; // Use an empty string for "All Categories"
    setSelectedCategory(categoryId);
  };

  const handleSearchClick = () => {
    // Logic to perform search action (e.g., redirect with search params)
    console.log('Search triggered for:', searchTerm, selectedCategory);
  };

  return (
    <header className="header">
      <div className="category-filter">
        <div className="search-bar">
          {/* Category dropdown */}
          <div className="category-select">
            <select id="category-select" value={selectedCategory || ''} onChange={handleCategoryChange} aria-label="Select a category">
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category.category_id} value={category.category_id}>
                  {category.category_name}
                </option>
              ))}
            </select>
          </div>

          {/* Search input field */}
          <div className="search-input">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by keyword..."
              aria-label="Search by Product or Artisan"
            />
          </div>

          {/* Search icon */}
          <div onClick={handleSearchClick}>
            < BsSearch
              className="search-icon"
            />
          </div>
        </div>
      </div>

      <LoginButton/>
    </header>
  );
};

export default TopSearch;
