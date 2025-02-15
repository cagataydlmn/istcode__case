"use client";

import React, { useState } from "react";

interface CategoryFilterProps {
  categories: string[]; 
  onFilter: (selectedCategory: string | null) => void; 
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories, onFilter }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCheckboxChange = (category: string) => {
    const newCategory = selectedCategory === category ? null : category; 
    setSelectedCategory(newCategory);
    onFilter(newCategory); 
  };

  return (
    <div>
      <div className="hidden md:flex gap-5 pr-5 text-[18px] font-medium">
        {categories.map((category) => (
          <label key={category} className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              value={category}
              checked={selectedCategory === category}
              onChange={() => handleCheckboxChange(category)}
              className="form-checkbox text-blue-500"
            />
            <span>{category}</span>
          </label>
        ))}
      </div>

      <div className="flex md:hidden gap-5 text-base font-medium">
        {categories.map((category) => (
          <label key={category} className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              value={category}
              checked={selectedCategory === category}
              onChange={() => handleCheckboxChange(category)}
              className="form-checkbox text-blue-500"
            />
            <span>{category}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
