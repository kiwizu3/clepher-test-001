import React, { useState } from 'react';

interface SearchProps {
  placeholder: string;
  onSearch: (searchValue: string) => Promise<void>;
  keywords: string[];
}

const Search: React.FC<SearchProps> = ({ placeholder, onSearch, keywords }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = () => {
    onSearch(searchValue);
  };

  const handleKeywordClick = (keyword: string) => {
    setSearchValue(keyword);
    onSearch(keyword);
  };

  const handleClear = () => {
    setSearchValue('');
    onSearch('');
  };

  return (
    <div className="flex items-center">
      <input
        type="text"
        className="border-2 border-gray-300 bg-white h-10 px-5 text-sm focus:outline-none mr-2"
        placeholder={placeholder}
        value={searchValue}
        onChange={handleChange}
      />
      <button className="bg-blue-500 text-white px-4 py-2" onClick={handleSearch}>
        Search
      </button>
      <button className="ml-2 bg-gray-200 text-gray-700 px-4 py-2" onClick={handleClear}>
        Clear
      </button>
      <div className="ml-4 flex pb-0 items-center">
        <p>| Recent: </p>
        {keywords.map((keyword, index) => (
          <button
            key={index}
            className="text-blue-500 mr-2 px-4 py-2"
            onClick={() => handleKeywordClick(keyword)}
          >
            {keyword}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Search;
