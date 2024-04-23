import React, { useState, useEffect } from 'react';
import { fetchMarketStatus } from '../services/DataService';
import Search from '../components/Search';

interface MarketStatusData {
  market_type: string;
  region: string;
  primary_exchanges: string;
  local_open: string;
  local_close: string;
  current_status: string;
  notes: string;
}

const MarketStatus: React.FC = () => {
  const [marketStatus, setMarketStatus] = useState<MarketStatusData[]>([]);
  const [filteredMarketStatus, setFilteredMarketStatus] = useState<MarketStatusData[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetchMarketStatus();
    const sortedMarketStatus = data.sort((a: MarketStatusData, b: MarketStatusData) => (a.current_status === 'open' ? -1 : 1));
    setMarketStatus(sortedMarketStatus);
    setFilteredMarketStatus(sortedMarketStatus);
  };

  const handleSearch = async (searchValue: string): Promise<void> => {
    const filteredData = marketStatus.filter(market =>
      market.region.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredMarketStatus(filteredData);
    return Promise.resolve();
  };

  const keywords = ['United States', 'Canada', 'United Kingdom'];

  return (
    <div className="container mx-auto px-4 py-4">
      <h1 className="text-3xl font-bold mb-4">Market Status</h1>
      <Search placeholder="Search by region" onSearch={handleSearch} keywords={keywords} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
        {filteredMarketStatus.map((market, index) => (
          <div key={index} className="bg-white shadow-card p-4">
            <h2 className="text-lg font-semibold mb-2">{market.region}</h2>
            <p className="text-sm mb-2">Market Type: {market.market_type}</p>
            <p className="text-sm mb-2">Primary Exchanges: {market.primary_exchanges}</p>
            <p className="text-sm mb-2">Local Open: {market.local_open}</p>
            <p className="text-sm mb-2">Local Close: {market.local_close}</p>
            <p className={`text-sm font-semibold ${market.current_status === 'open' ? 'text-green-500' : 'text-red-500'}`}>
              Current Status: {market.current_status}
            </p>
            {market.current_status === 'open' && <p className="text-xs">Notes: {market.notes}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketStatus;
