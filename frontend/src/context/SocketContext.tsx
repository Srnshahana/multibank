import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export interface TickerData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  timestamp: number;
}

interface SocketContextType {
  socket: Socket | null;
  connected: boolean;
  tickers: Record<string, TickerData>;
  history: Record<string, TickerData[]>;
  fetchHistory: (symbol: string) => Promise<void>;
}

const SocketContext = createContext<SocketContextType | null>(null);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);
  const [tickers, setTickers] = useState<Record<string, TickerData>>({});
  const [history, setHistory] = useState<Record<string, TickerData[]>>({});

  useEffect(() => {
    // In production, this would be the actual backend URL
    const newSocket = io('http://localhost:3001');
    setSocket(newSocket);

    newSocket.on('connect', () => {
      setConnected(true);
    });

    newSocket.on('disconnect', () => {
      setConnected(false);
    });

    newSocket.on('price-update', (data: TickerData[]) => {
      setTickers((prev) => {
        const next = { ...prev };
        data.forEach((ticker) => {
          next[ticker.symbol] = ticker;
        });
        return next;
      });
      
      // Update real-time history for active charts
      setHistory((prev) => {
        const next = { ...prev };
        data.forEach((ticker) => {
          if (next[ticker.symbol]) {
            // Keep last 50 data points
            next[ticker.symbol] = [...next[ticker.symbol], ticker].slice(-50);
          }
        });
        return next;
      });
    });

    return () => {
      newSocket.close();
    };
  }, []);

  const fetchHistory = async (symbol: string) => {
    try {
      const res = await fetch(`http://localhost:3001/api/history/${symbol}`);
      const data = await res.json();
      setHistory((prev) => ({
        ...prev,
        [symbol]: data,
      }));
    } catch (err) {
      console.error('Failed to fetch history', err);
    }
  };

  return (
    <SocketContext.Provider value={{ socket, connected, tickers, history, fetchHistory }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};
