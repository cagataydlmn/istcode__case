import React, { useState } from "react";

interface AutoCompleteProps {
  onSearch: (searchTerm: string) => void;
}

const AutoComplete: React.FC<AutoCompleteProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearch(value); 
  };

  return (
    <div className="flex justify-center">
      <input
  className="border-2 border-gray-300 focus:outline-none focus:border-blue-300 p-2 w-full"
  placeholder="ARAMA"
        value={searchTerm}
        onChange={handleChange}
      />
    </div>
  );
};

export default AutoComplete;
