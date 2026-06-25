export const API_ENDPOINTS = {
  AUTH: { LOGIN: '/auth/login', REGISTER: '/auth/register', ME: '/auth/me' },
  MEETINGS: { BASE: '/meetings', BY_ID: (id: string) => `/meetings/${id}` },
  CHAT: { BASE: '/chat', ROOM: (id: string) => `/chat/${id}` },
  RECORDINGS: { BASE: '/recordings', BY_ID: (id: string) => `/recordings/${id}` },
  TEAMS: { BASE: '/teams', BY_ID: (id: string) => `/teams/${id}` },
  USERS: { BASE: '/users', PROFILE: '/users/profile' },
} as const;
