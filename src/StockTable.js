import React, { useState, useEffect } from 'react';

const TICKERS = [
  'RELIANCE.NS',
  'TCS.NS',
  'HDFCBANK.NS',
  'ICICIBANK.NS',
  'INFY.NS',
  'HINDUNILVR.NS',
  'HDFC.NS',
  'BHARTIARTL.NS',
  'ITC.NS',
  'KOTAKBANK.NS'
];

function StockTable() {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const url = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${TICKERS.join(',')}`;
        const resp = await fetch(url);
        const data = await resp.json();
        if (data.quoteResponse && data.quoteResponse.result) {
          setStocks(data.quoteResponse.result);
        }
      } catch (err) {
        console.error('Failed to fetch stock data', err);
      }
    };

    fetchStocks();
    const interval = setInterval(fetchStocks, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <table className="stock-table">
      <thead>
        <tr>
          <th>Company</th>
          <th>Symbol</th>
          <th>Price (INR)</th>
        </tr>
      </thead>
      <tbody>
        {stocks.map((stock) => (
          <tr key={stock.symbol}>
            <td>{stock.shortName || stock.longName || stock.symbol}</td>
            <td>{stock.symbol}</td>
            <td>{stock.regularMarketPrice}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default StockTable;
