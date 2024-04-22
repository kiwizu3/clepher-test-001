import React, { useState } from 'react';
import Search from '../components/Search';
import { fetchStockData } from '../services/DataService';

const Home: React.FC = () => {
  const [stockMatches, setStockMatches] = useState<any[]>([]);

  const handleSearch = async (searchValue: string) => {
    const matches = await fetchStockData(searchValue);
    setStockMatches(matches);
  };

  return (
    <div className="container mx-auto px-4 py-4">
      <h1 className="text-3xl font-bold mb-4">Stock Tracker</h1>
      <Search placeholder="Search" onSearch={handleSearch} />
      <div className="mt-4">
        {stockMatches.length === 0 ? (
          <p className="text-red-500">No Data</p>
        ) : (
          stockMatches.map((match, index) => (
            <div key={index} className="bg-white shadow-card p-4 mb-4">
              <h2 className="text-xl font-bold mb-2">{match['1. symbol']}</h2>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="font-semibold">Name</p>
                  <p>{match['2. name']}</p>
                </div>
                <div>
                  <p className="font-semibold">Type</p>
                  <p>{match['3. type']}</p>
                </div>
                <div>
                  <p className="font-semibold">Region</p>
                  <p>{match['4. region']}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
