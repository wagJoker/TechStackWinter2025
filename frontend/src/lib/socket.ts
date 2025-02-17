import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3001';

export const socket = io(SOCKET_URL, {
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

// Ping mechanism
let pingInterval: number;

socket.on('connect', () => {
  pingInterval = setInterval(() => {
    const start = Date.now();
    socket.emit('ping', () => {
      const latency = Date.now() - start;
      console.log(`Latency: ${latency}ms`);
    });
  }, 5000);
});

socket.on('disconnect', () => {
  clearInterval(pingInterval);
});