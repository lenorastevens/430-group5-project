'use client';

import { useEffect, useState } from 'react';
import { useFilter } from '@/context/FilterContext';
import SearchBar from './SearchBar';
import LoginButton from './LoginButton';

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
  return (
    <header className="header">
      <div className="category-filter">
        <SearchBar 
          searchTerm={searchTerm}  // Pass searchTerm as a prop
          onSearchChange={setSearchTerm}  // Pass setSearchTerm as a prop
        />
        <select id="category-select" value={selectedCategory || ''} onChange={handleCategoryChange} aria-label="Select a category">
          <option value="">All Categories</option>
          {/* Dynamically generate category options */}
          {categories.map((category) => (
            <option key={category.category_id} value={category.category_id}>
              {category.category_name}
            </option>
          ))}
        </select>
      </div>
      <LoginButton/>
    </header>
  );
};

export default TopSearch;
