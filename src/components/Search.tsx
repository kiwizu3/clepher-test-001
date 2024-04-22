import React, { useState } from 'react';

interface SearchProps {
  placeholder: string;
  onSearch: (value: string) => void;
}

const Search: React.FC<SearchProps> = ({ placeholder, onSearch }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    onSearch(event.target.value);
  };

  const handleClearInput = () => {
    setSearchValue('');
    onSearch('');
  };

  return (
    <div className="flex items-center">
      <input
        type="text"
        className="border-2 border-gray-300 bg-white h-10 px-5 rounded-lg text-sm focus:outline-none"
        placeholder={placeholder}
        value={searchValue}
        onChange={handleInputChange}
      />
      <button className="ml-2 px-4 py-2 bg-gray-200 rounded" onClick={handleClearInput}>
        Clear
      </button>
    </div>
  );
};

export default Search;
