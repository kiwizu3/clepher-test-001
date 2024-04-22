import React, { useState, useEffect } from 'react';

import { fetchIntradayData } from '../services/DataService';

import Pagination from '../components/Pagination';
import Table from '../components/Table';

interface TimeSeriesData {
  [key: string]: {
    '1. open': string;
    '2. high': string;
    '3. low': string;
    '4. close': string;
    '5. volume': string;
  };
}

interface StockData {
  'Time Series (5min)': TimeSeriesData;
  'Meta Data': {
    '2. Symbol': string;
  };
}

const StockData: React.FC = () => {
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const rowsPerPage = 10;

  useEffect(() => {
    // Fetch the data from the API
    const fetchData = async () => {
      try {
        const data = await fetchIntradayData();
        setStockData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = stockData ? Object.entries(stockData['Time Series (5min)']).slice(indexOfFirstRow, indexOfLastRow) : [];

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const symbol = stockData ? stockData['Meta Data']['2. Symbol'] : '';

  const headers = ['Time', 'Open', 'High', 'Low', 'Close', 'Volume'];
  const rows = currentRows.map(([timestamp, data]) => ({
    Time: timestamp,
    Open: data['1. open'],
    High: data['2. high'],
    Low: data['3. low'],
    Close: data['4. close'],
    Volume: data['5. volume'],
  }));

  return (
    <div className="container mx-auto px-4 py-8">
      {stockData ? (
        <div>
          <h2 className="text-2xl font-bold mb-4">Stock Data for {symbol}</h2>
          <Table headers={headers} rows={rows} />
          <div className="mt-4">
            <Pagination totalRows={Object.keys(stockData['Time Series (5min)']).length} rowsPerPage={rowsPerPage} currentPage={currentPage} paginate={paginate} />
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default StockData;
