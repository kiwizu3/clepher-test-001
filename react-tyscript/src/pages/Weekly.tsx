import React, { useState, useEffect } from 'react';

import { fetchWeeklyData } from '../services/DataService';

import Pagination from '../components/Pagination';
import Table from '../components/Table';


interface WeeklyTimeSeriesData {
  [date: string]: {
    '1. open': string;
    '2. high': string;
    '3. low': string;
    '4. close': string;
    '5. volume': string;
  };
}

interface WeeklyData {
  'Weekly Time Series': WeeklyTimeSeriesData;
  'Meta Data': {
    '2. Symbol': string;
  };
}

const WeeklyData: React.FC = () => {
  const [weeklyData, setWeeklyData] = useState<WeeklyData | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const rowsPerPage = 10;

  useEffect(() => {
    // Fetch the data from the API
    const fetchData = async () => {
      try {
        const data = await fetchWeeklyData();
        setWeeklyData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = weeklyData
    ? Object.entries(weeklyData['Weekly Time Series']).slice(indexOfFirstRow, indexOfLastRow)
    : [];

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const symbol = weeklyData ? weeklyData['Meta Data']['2. Symbol'] : '';

  return (
    <div className="container mx-auto px-4 py-8">
      {weeklyData ? (
        <div>
          <h2 className="text-2xl font-bold mb-4">Weekly Data for {symbol}</h2>
          <Table
            headers={['Date', 'Open', 'High', 'Low', 'Close', 'Volume']}
            rows={currentRows.map(([date, data]) => ({
              date,
              open: data['1. open'],
              high: data['2. high'],
              low: data['3. low'],
              close: data['4. close'],
              volume: data['5. volume'],
            }))}
          />
          <div className="mt-4">
            <Pagination
              totalRows={Object.keys(weeklyData['Weekly Time Series']).length}
              rowsPerPage={rowsPerPage}
              currentPage={currentPage}
              paginate={paginate}
            />
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default WeeklyData;
