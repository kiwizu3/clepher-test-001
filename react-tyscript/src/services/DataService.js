export const fetchDailyData = async () => {
    try {
      const response = await fetch('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=demo');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching daily data:', error);
      throw error;
    }
  };

  export const fetchWeeklyData = async () => {
    try {
      const response = await fetch('https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=IBM&apikey=demo');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching daily data:', error);
      throw error;
    }
  };

  export const fetchIntradayData = async () => {
    try {
      const response = await fetch('https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching daily data:', error);
      throw error;
    }
  };

  export const fetchStockData = async (searchValue) => {
    try {
      const response = await fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchValue}&apikey=demo`);
      const data = await response.json();
      const matches = data.bestMatches || [];
      return matches;
    } catch (error) {
      console.error('Error fetching stock data:', error);
      return [];
    }
  };

  export const fetchMarketStatus = async () => {
    try {
      const response = await fetch('https://www.alphavantage.co/query?function=MARKET_STATUS&apikey=demo');
      const data = await response.json();
      return data.markets;
    } catch (error) {
      console.error('Error fetching market status:', error);
      return [];
    }
  };