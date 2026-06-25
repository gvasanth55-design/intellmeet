import { useAuthStore } from '../store/auth';

const BASE_URL = import.meta.env.VITE_API_URL || '/api';

interface RequestConfig {
  method?: string;
  body?: any;
  headers?: Record<string, string>;
  params?: Record<string, string>;
}

export const apiClient = {
  async request<T = any>(endpoint: string, config: RequestConfig = {}): Promise<T> {
    const { method = 'GET', body, headers = {}, params } = config;

    const url = new URL(`${BASE_URL}${endpoint}`, window.location.origin);
    if (params) Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

    const token = useAuthStore.getState().token;
    if (token) headers['Authorization'] = `Bearer ${token}`;
    if (body && !(body instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }

    const response = await fetch(url.toString(), {
      method,
      headers,
      body: body instanceof FormData ? body : body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ msg: 'Request failed' }));
      throw new Error(error.msg || `HTTP ${response.status}`);
    }

    return response.json();
  },

  get: <T = any>(endpoint: string, params?: Record<string, string>) =>
    apiClient.request<T>(endpoint, { params }),

  post: <T = any>(endpoint: string, body?: any) =>
    apiClient.request<T>(endpoint, { method: 'POST', body }),

  put: <T = any>(endpoint: string, body?: any) =>
    apiClient.request<T>(endpoint, { method: 'PUT', body }),

  patch: <T = any>(endpoint: string, body?: any) =>
    apiClient.request<T>(endpoint, { method: 'PATCH', body }),

  delete: <T = any>(endpoint: string) =>
    apiClient.request<T>(endpoint, { method: 'DELETE' }),
};
