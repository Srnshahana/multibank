import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import { setupSocket } from './socket';
import { getAvailableTickers, getHistoricalData } from './mockData';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new SocketIOServer(server, {
  cors: {
    origin: process.env.CLIENT_URL || '*',
    methods: ['GET', 'POST']
  }
});

// Setup Socket.io events
setupSocket(io);

// REST API Routes
app.get('/api/tickers', (req, res) => {
  res.json(getAvailableTickers());
});

app.get('/api/history/:symbol', (req, res) => {
  const { symbol } = req.params;
  const data = getHistoricalData(symbol);
  
  if (data.length === 0) {
    return res.status(404).json({ error: 'Ticker not found' });
  }
  
  res.json(data);
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Backend service running on port ${PORT}`);
});
