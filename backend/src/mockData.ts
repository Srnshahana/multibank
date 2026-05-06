export interface TickerData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  timestamp: number;
}

const initialData: Record<string, number> = {
  'AAPL': 175.50,
  'TSLA': 210.25,
  'BTC-USD': 65400.00,
  'ETH-USD': 3500.50,
  'NVDA': 850.75,
  'MSFT': 420.30,
  'AMZN': 178.90,
  'GOOGL': 155.20,
};

let currentData: Record<string, TickerData> = {};

// Initialize data
Object.keys(initialData).forEach(symbol => {
  currentData[symbol] = {
    symbol,
    price: initialData[symbol],
    change: 0,
    changePercent: 0,
    volume: Math.floor(Math.random() * 1000000),
    timestamp: Date.now()
  };
});

/**
 * Simulates market movement using a random walk.
 */
export const updatePrices = (): TickerData[] => {
  const now = Date.now();
  
  return Object.keys(currentData).map(symbol => {
    const data = currentData[symbol];
    
    // Random movement between -0.5% and +0.5%
    const maxChangePercent = 0.005;
    const changeFactor = 1 + (Math.random() * maxChangePercent * 2 - maxChangePercent);
    
    const newPrice = Number((data.price * changeFactor).toFixed(2));
    const change = Number((newPrice - data.price).toFixed(2));
    const changePercent = Number(((change / data.price) * 100).toFixed(2));
    
    const updatedData: TickerData = {
      ...data,
      price: newPrice,
      change,
      changePercent,
      volume: data.volume + Math.floor(Math.random() * 5000),
      timestamp: now
    };
    
    currentData[symbol] = updatedData;
    return updatedData;
  });
};

export const getAvailableTickers = () => Object.keys(initialData);

export const getHistoricalData = (symbol: string, dataPoints: number = 50) => {
  if (!currentData[symbol]) return [];
  
  const history = [];
  let price = currentData[symbol].price;
  let time = Date.now() - (dataPoints * 1000); // go back in time
  
  for (let i = 0; i < dataPoints; i++) {
    history.push({
      symbol,
      price,
      timestamp: time
    });
    // Reverse random walk to generate plausible history
    const maxChangePercent = 0.005;
    const changeFactor = 1 + (Math.random() * maxChangePercent * 2 - maxChangePercent);
    price = Number((price * changeFactor).toFixed(2));
    time += 1000;
  }
  
  return history;
};
