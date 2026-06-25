import { currentUser } from '../mock/users';
import { useAuthStore } from '../store/auth';

export const authService = {
  async login(email: string, password: string) {
    await new Promise((r) => setTimeout(r, 300));
    const user = { id: currentUser.id, name: currentUser.name, email: currentUser.email, role: currentUser.role };
    useAuthStore.getState().setAuth('mock-token-abc123', user);
    return { token: 'mock-token-abc123', user };
  },

  async register(name: string, email: string, password: string) {
    await new Promise((r) => setTimeout(r, 300));
    return { id: 'u-new', name, email };
  },

  logout() {
    useAuthStore.getState().logout();
  },

  async getProfile() {
    await new Promise((r) => setTimeout(r, 200));
    return currentUser;
  },
};
