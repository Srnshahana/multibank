import { updatePrices, getAvailableTickers, getHistoricalData } from './mockData';

describe('Mock Data Generator', () => {
  it('should return a list of available tickers', () => {
    const tickers = getAvailableTickers();
    expect(tickers).toContain('AAPL');
    expect(tickers).toContain('BTC-USD');
    expect(tickers.length).toBeGreaterThan(0);
  });

  it('should generate historical data for a valid ticker', () => {
    const history = getHistoricalData('AAPL', 10);
    expect(history.length).toBe(10);
    expect(history[0].symbol).toBe('AAPL');
    expect(history[0].price).toBeGreaterThan(0);
  });

  it('should update prices and keep them within reasonable limits', () => {
    const newPrices = updatePrices();
    expect(newPrices.length).toBeGreaterThan(0);
    
    const aapl = newPrices.find(t => t.symbol === 'AAPL');
    expect(aapl).toBeDefined();
    expect(aapl?.price).toBeGreaterThan(0);
    expect(aapl?.changePercent).toBeLessThanOrEqual(0.5); // Max change is 0.5%
    expect(aapl?.changePercent).toBeGreaterThanOrEqual(-0.5);
  });
});
