import { Socket } from 'socket.io';

export const registerChatHandlers = (socket: Socket, io: any): void => {
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
};
