export const config = {
  apiUrl: import.meta.env.VITE_API_URL || '/api',
  socketUrl: import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000',
  appName: 'IntellMeet',
  meeting: {
    maxParticipants: 50,
    defaultVideoQuality: '720p' as const,
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' },
    ],
  },
};
