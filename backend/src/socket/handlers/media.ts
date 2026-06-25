import { Socket } from 'socket.io';

export const registerMediaHandlers = (socket: Socket, io: any): void => {
  socket.on('toggle-mute', ({ meetingId, userId, isMuted }) => {
    io.to(meetingId).emit('participant-muted', { userId, isMuted });
  });
};
