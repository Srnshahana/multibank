import { Server as SocketIOServer, Socket } from 'socket.io';
import { updatePrices } from './mockData';

export const setupSocket = (io: SocketIOServer) => {
  console.log('Starting global price generation interval...');
  setInterval(() => {
    if (io.engine.clientsCount > 0) {
      const prices = updatePrices();
      io.emit('price-update', prices);
    }
  }, 1000); // 1 update per second

  io.on('connection', (socket: Socket) => {
    console.log(`Client connected: ${socket.id}, total: ${io.engine.clientsCount}`);

    // Send immediate update upon connection
    socket.emit('price-update', updatePrices());

    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id}, total: ${io.engine.clientsCount}`);
    });
  });
};
