import React, { useState, useEffect } from 'react';
import Pagination from '../components/Pagination';
import Table from '../components/Table';
import { fetchDailyData } from '../services/DataService';

interface DailyData {
  [date: string]: {
    '1. open': string;
    '2. high': string;
    '3. low': string;
    '4. close': string;
    '5. volume': string;
  };
}

interface MetaData {
  '1. Information': string;
  '2. Symbol': string;
  '3. Last Refreshed': string;
  '4. Output Size': string;
  '5. Time Zone': string;
}

interface StockData {
  'Meta Data': MetaData;
  'Time Series (Daily)': DailyData;
}

const DailyStockData: React.FC = () => {
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const rowsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchDailyData();
        setStockData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = stockData ? Object.entries(stockData['Time Series (Daily)']).slice(indexOfFirstRow, indexOfLastRow) : [];

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Extracting meta data
  const metaData = stockData ? stockData['Meta Data'] : null;

  const headers = ['Date', 'Open', 'High', 'Low', 'Close', 'Volume'];
  const rows = currentRows.map(([date, data]) => ({
    Date: date,
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
          <h2 className="text-2xl font-bold mb-4">Daily Stock Data for {metaData ? metaData['2. Symbol'] : ''}</h2>
          <Table headers={headers} rows={rows} />
          <div className="mt-4">
            <Pagination totalRows={Object.keys(stockData['Time Series (Daily)']).length} rowsPerPage={rowsPerPage} currentPage={currentPage} paginate={paginate} />
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default DailyStockData;
