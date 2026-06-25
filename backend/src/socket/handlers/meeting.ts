import { Socket } from 'socket.io';

export const registerMeetingHandlers = (socket: Socket, io: any): void => {
  socket.on('join-meeting', ({ meetingId, userId }) => {
    socket.join(meetingId);
    socket.to(meetingId).emit('user-joined', { userId });
  });

  socket.on('leave-meeting', ({ meetingId, userId }) => {
    socket.leave(meetingId);
    socket.to(meetingId).emit('user-left', { userId });
  });
};
