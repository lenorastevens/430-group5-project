'use client';

import 'dotenv/config';
import { useEffect, useState } from 'react';
import { useFilter } from '@/app/ui/FilterContext';
import { BsSearch } from "react-icons/bs";
import { Category } from '@/app/lib/definitions';

const TopSearch = () => {
  const { searchTerm, setSearchTerm, selectedCategory, setSelectedCategory } = useFilter();  
  const [categories, setCategories] = useState<Category[]>([]); 

  
  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data: Category[] = await response.json();
        setCategories(data);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };
  
    getCategories();
  }, []);

 
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryId = e.target.value ? Number(e.target.value) : ""; 
    setSelectedCategory(categoryId);
  };

  const handleSearchClick = () => {
    console.log('Search triggered for:', searchTerm, selectedCategory);
  };

  return (
    <header className="flex justify-between items-center p-4">
      <div className="flex items-center justify-between space-x-4 w-full bg-accent1 border-4 border-foreground rounded-md p-2">
        {/* Category dropdown */}
        <div className="mr-4">
          <select
            id="category-select"
            value={selectedCategory || ''}
            onChange={handleCategoryChange}
            className="p-2 border-2 border-foreground rounded-md bg-white"
            aria-label="Select a category"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.category_id} value={category.category_id}>
                {category.category_name}
              </option>
            ))}
          </select>
        </div>

        {/* Search input field */}
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by keyword..."
          className="p-2 w-3/4 border-2 border-foreground rounded-md"
          aria-label="Search by Product or Artisan"
        />

        {/* Search icon */}
        <div
          onClick={handleSearchClick}
          className="p-2 bg-accent1 text-secondary hover:bg-accent2 rounded-md ml-2"
        >
          <BsSearch className="w-5 h-5" />
        </div>
      </div>

    </header>
  );
};

export default TopSearch;
