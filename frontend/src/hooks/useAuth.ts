import { useAuthStore } from '../store/auth';

export const useAuth = () => {
  const { token, user, isAuthenticated, setAuth, logout } = useAuthStore();
  return { token, user, isAuthenticated, setAuth, logout };
};
