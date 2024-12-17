// TopSearch component
'use client';

import { useEffect, useState } from 'react';
import { useFilter } from '@/app/ui/FilterContext';
import { BsSearch } from 'react-icons/bs';
import { Category } from '@/app/lib/definitions';
import { useRouter } from 'next/navigation'; // Used for navigation

const TopSearch = () => {
  const { searchTerm, setSearchTerm, selectedCategory, setSelectedCategory } = useFilter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true); // Set client-side flag once the component mounts
  }, []);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        if (!response.ok) throw new Error('Failed to fetch categories');
        const data: Category[] = await response.json();
        setCategories(data);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };

    getCategories();
  }, []);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    setSelectedCategory(Number(selected) || '');

    const params = new URLSearchParams(window.location.search);
    if (selected) {
      params.set('category', selected);
    } else {
      params.delete('category');
    }
    window.location.href =  `/dashboard/product?${params.toString()}`;  
  };

  

  const handleSearchClick = () => {
    // Check if on client side
    if (isClient) {
      const queryParams = new URLSearchParams();
      if (searchTerm) queryParams.append('searchTerm', searchTerm);
      if (selectedCategory) queryParams.append('category', selectedCategory.toString());
      router.push(`/dashboard/product?${queryParams.toString()}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearchClick(); 
    }
  };

  return (
    <header className="p-4">
      <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 w-full bg-accent1 border-4 border-foreground rounded-md p-2">
        {/* Category dropdown */}
        <div className="w-full md:w-1/4">
          <select
            id="category-select"
            value={selectedCategory || ''}
            onChange={handleCategoryChange}
            className="p-2 w-full border-2 border-foreground rounded-md bg-white"
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
        <div className="w-full flex-grow">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search by keyword..."
            className="p-2 w-full border-2 border-foreground rounded-md"
            aria-label="Search by Product or Artisan"
          />
        </div>

        {/* Search icon */}
        <div
          onClick={handleSearchClick}
          className="p-2 bg-accent1 text-secondary hover:bg-accent2 rounded-md cursor-pointer"
        >
          <BsSearch className="w-6 h-6" />
        </div>
      </div>
    </header>
  );
};

export default TopSearch;
