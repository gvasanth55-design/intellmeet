import { useEffect } from 'react';
import { getSocket, connectSocket, disconnectSocket } from '../lib/socket';
import { useAuth } from './useAuth';

export const useSocket = () => {
  const { token } = useAuth();

  useEffect(() => {
    if (token) {
      const socket = connectSocket(token);
      return () => { socket.disconnect(); };
    } else {
      disconnectSocket();
    }
  }, [token]);

  return getSocket();
};
