import React, { useMemo } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { useSocket } from '../context/SocketContext';

interface ChartProps {
  symbol: string;
}

export const Chart: React.FC<ChartProps> = ({ symbol }) => {
  const { history, tickers } = useSocket();
  const tickerData = history[symbol] || [];
  const currentTicker = tickers[symbol];

  const isUp = currentTicker ? currentTicker.change >= 0 : true;

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="glass-panel p-4 !bg-surface/90 border-border">
          <p className="text-text-secondary text-sm mb-1">
            {new Date(data.timestamp).toLocaleTimeString()}
          </p>
          <p className="font-mono text-xl text-text-primary">
            ${data.price.toFixed(2)}
          </p>
        </div>
      );
    }
    return null;
  };

  const domain = useMemo(() => {
    if (tickerData.length === 0) return ['auto', 'auto'];
    const prices = tickerData.map(d => d.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const padding = (max - min) * 0.1; // 10% padding
    return [min - padding, max + padding];
  }, [tickerData]);

  if (tickerData.length === 0) {
    return (
      <div className="h-[400px] flex items-center justify-center text-text-tertiary">
        <div className="animate-pulse">Loading chart data...</div>
      </div>
    );
  }

  return (
    <div className="h-[400px] w-full mt-6">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={tickerData}
          margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop 
                offset="5%" 
                stopColor={isUp ? 'var(--color-success)' : 'var(--color-danger)'} 
                stopOpacity={0.3}
              />
              <stop 
                offset="95%" 
                stopColor={isUp ? 'var(--color-success)' : 'var(--color-danger)'} 
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
          <XAxis 
            dataKey="timestamp" 
            tickFormatter={(tick) => new Date(tick).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            stroke="var(--color-text-tertiary)"
            tick={{ fill: 'var(--color-text-tertiary)' }}
            tickMargin={10}
          />
          <YAxis 
            domain={domain as any}
            tickFormatter={(tick) => `$${tick.toFixed(2)}`}
            stroke="var(--color-text-tertiary)"
            tick={{ fill: 'var(--color-text-tertiary)' }}
            width={80}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="price"
            stroke={isUp ? 'var(--color-success)' : 'var(--color-danger)'}
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorPrice)"
            isAnimationActive={false} // Disable animation for real-time smoothness
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
