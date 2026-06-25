import { Server as SocketServer } from 'socket.io';
import { Server as HttpServer } from 'http';
import { logger } from '../logger';

let io: SocketServer;

export const initializeSocket = (server: HttpServer): SocketServer => {
  io = new SocketServer(server, {
    cors: {
      origin: process.env.CORS_ORIGIN || '*',
      methods: ['GET', 'POST'],
    },
    pingTimeout: 60000,
    pingInterval: 25000,
  });

  io.on('connection', (socket) => {
    logger.info(`User connected: ${socket.id}`);

    socket.on('join-meeting', ({ meetingId, userId }) => {
      socket.join(meetingId);
      logger.info(`${userId} joined meeting: ${meetingId}`);
      socket.to(meetingId).emit('user-joined', { userId });
    });

    socket.on('leave-meeting', ({ meetingId, userId }) => {
      socket.leave(meetingId);
      logger.info(`${userId} left meeting: ${meetingId}`);
      socket.to(meetingId).emit('user-left', { userId });
    });

    socket.on('send-message', ({ meetingId, message, sender }) => {
      io.to(meetingId).emit('receive-message', {
        message,
        sender,
        time: new Date().toLocaleTimeString(),
      });
    });

    socket.on('typing', ({ meetingId, userId }) => {
      socket.to(meetingId).emit('user-typing', { userId });
    });

    socket.on('stop-typing', ({ meetingId, userId }) => {
      socket.to(meetingId).emit('user-stop-typing', { userId });
    });

    socket.on('toggle-mute', ({ meetingId, userId, isMuted }) => {
      io.to(meetingId).emit('participant-muted', { userId, isMuted });
    });

    socket.on('disconnect', () => {
      logger.info(`User disconnected: ${socket.id}`);
    });
  });

  logger.info('Socket.IO initialized');
  return io;
};

export const getIO = (): SocketServer => {
  if (!io) {
    throw new Error('Socket.IO not initialized');
  }
  return io;
};
