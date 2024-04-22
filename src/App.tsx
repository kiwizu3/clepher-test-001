import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import StockData from './pages/Intraday';
import DailyStockData from './pages/Daily';
import WeeklyData from './pages/Weekly';
import MarketStatus from './pages/MarketStatus';

const App: React.FC = () => {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/stockdata" Component={StockData} />
        <Route path="/dailydata" Component={DailyStockData} />
        <Route path="/weeklydata" Component={WeeklyData} />
        <Route path="/marketstatus" Component={MarketStatus} />
        
      </Routes>
    </>
  );
};

export default App;
