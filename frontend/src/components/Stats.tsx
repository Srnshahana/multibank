import React from 'react';
import { useSocket } from '../context/SocketContext';
import { TrendingUp, TrendingDown, Clock, BarChart2 } from 'lucide-react';
import { clsx } from 'clsx';

interface StatsProps {
  symbol: string;
}

export const Stats: React.FC<StatsProps> = ({ symbol }) => {
  const { tickers } = useSocket();
  const ticker = tickers[symbol];

  if (!ticker) return null;

  const isUp = ticker.change >= 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
      <div className="glass-panel p-6 flex flex-col justify-between">
        <p className="text-text-tertiary text-sm font-medium uppercase tracking-wider mb-2">Current Price</p>
        <p className="text-4xl font-mono font-bold text-text-primary">
          ${ticker.price.toFixed(2)}
        </p>
      </div>

      <div className="glass-panel p-6 flex flex-col justify-between">
        <p className="text-text-tertiary text-sm font-medium uppercase tracking-wider mb-2">24h Change</p>
        <div className="flex items-center gap-2">
          <p className={clsx(
            "text-3xl font-mono font-bold flex items-center",
            isUp ? "text-success text-glow-success" : "text-danger text-glow-danger"
          )}>
            {isUp ? <TrendingUp className="w-6 h-6 mr-2" /> : <TrendingDown className="w-6 h-6 mr-2" />}
            {Math.abs(ticker.changePercent).toFixed(2)}%
          </p>
        </div>
      </div>

      <div className="glass-panel p-6 flex flex-col justify-between">
        <p className="text-text-tertiary text-sm font-medium uppercase tracking-wider mb-2">Volume</p>
        <div className="flex items-center gap-2 text-text-secondary">
          <BarChart2 className="w-5 h-5" />
          <p className="text-2xl font-mono font-bold">
            {ticker.volume.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="glass-panel p-6 flex flex-col justify-between">
        <p className="text-text-tertiary text-sm font-medium uppercase tracking-wider mb-2">Last Updated</p>
        <div className="flex items-center gap-2 text-text-secondary">
          <Clock className="w-5 h-5" />
          <p className="text-xl font-mono font-bold">
            {new Date(ticker.timestamp).toLocaleTimeString()}
          </p>
        </div>
      </div>
    </div>
  );
};
