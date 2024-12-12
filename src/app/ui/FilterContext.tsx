'use client'

import React, { createContext, useContext, useState } from 'react';

interface FilterContextProps {
  selectedCategory: number | '';
  searchTerm: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<number | ''>>;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

// Create a context with default values
const FilterContext = createContext<FilterContextProps | undefined>(undefined);

export const FilterProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedCategory, setSelectedCategory] = useState<number | ''>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  return (
    <FilterContext.Provider value={{ selectedCategory, searchTerm, setSelectedCategory, setSearchTerm }}>
      {children}
    </FilterContext.Provider>
  );
};

// Custom hook to access the filter context
export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
};
