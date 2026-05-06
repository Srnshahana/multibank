import React from 'react';
import { useSocket } from '../context/SocketContext';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface SidebarProps {
  activeTicker: string;
  setActiveTicker: (symbol: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTicker, setActiveTicker }) => {
  const { tickers } = useSocket();

  return (
    <aside className="w-80 border-r border-border/50 bg-surface/30 backdrop-blur-sm flex flex-col h-full overflow-y-auto">
      <div className="p-6 border-b border-border/50 sticky top-0 bg-background/80 backdrop-blur-md z-10">
        <h2 className="text-xl font-bold flex items-center gap-2">
          {/* <Activity className="text-primary w-6 h-6" /> */}
          Market Tickers
        </h2>
      </div>

      <div className="p-4 flex flex-col gap-2">
        {Object.values(tickers).map((ticker) => {
          const isUp = ticker.change >= 0;
          const isActive = activeTicker === ticker.symbol;

          return (
            <button
              key={ticker.symbol}
              onClick={() => setActiveTicker(ticker.symbol)}
              className={twMerge(
                "flex items-center justify-between p-4 rounded-xl transition-all duration-300 border border-transparent text-left",
                isActive
                  ? "bg-primary/10 border-primary/30 shadow-[0_0_15px_rgba(14,165,233,0.15)]"
                  : "hover:bg-surface-hover hover:border-border"
              )}
            >
              <div>
                <h3 className="font-bold text-lg">{ticker.symbol}</h3>
                <p className="text-sm text-text-tertiary">Vol: {(ticker.volume / 1000).toFixed(1)}k</p>
              </div>
              <div className="text-right">
                <p className="font-mono text-lg">${ticker.price.toFixed(2)}</p>
                <p className={clsx(
                  "text-sm flex items-center justify-end gap-1 font-medium",
                  isUp ? "text-success text-glow-success" : "text-danger text-glow-danger"
                )}>
                  {isUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {Math.abs(ticker.changePercent).toFixed(2)}%
                </p>
              </div>
            </button>
          );
        })}
        {Object.keys(tickers).length === 0 && (
          <div className="text-center text-text-tertiary p-8">
            <div className="animate-pulse flex flex-col items-center gap-4">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <p>Connecting to market data...</p>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
