import { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { api } from './client';
import { useAuthStore } from '@/store/useAuthStore';

interface QueuedRequest {
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
}

interface ErrorResponse {
  error: string;
  code?: string;
  requiresVerification?: boolean;
}

let isRefreshing = false;
let failedQueue: QueuedRequest[] = [];

const processQueue = (error: any = null) => {
  const queue = [...failedQueue];
  failedQueue = [];

  queue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve();
    }
  });
};

const redirectToLogin = () => {
  if (typeof window !== 'undefined') {
    const currentPath = window.location.pathname;

    // CRITICAL: Don't redirect if already on auth pages
    if (currentPath.startsWith('/auth/')) {
      console.log('⚠️ Already on auth page, skipping redirect');
      return;
    }

    // Clear auth state
    useAuthStore.getState().clearAuth();

    // Hard redirect to login (will cause page reload but that's okay)
    window.location.replace('/auth/login');
  }
};

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ErrorResponse>) => {
    if (!error.response) {
      return Promise.reject(error);
    }

    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (!originalRequest) {
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      const errorData = error.response.data;

      // Handle special cases that shouldn't trigger refresh
      if (
        errorData?.code === 'EMAIL_NOT_VERIFIED' ||
        errorData?.code === 'NO_REFRESH_TOKEN' ||
        originalRequest.url?.includes('/api/auth/refresh') ||
        originalRequest.url?.includes('/api/auth/login')
      ) {
        if (
          originalRequest.url?.includes('/api/auth/refresh') ||
          errorData?.code === 'NO_REFRESH_TOKEN'
        ) {
          redirectToLogin();
        }
        return Promise.reject(error);
      }

      // If already refreshing, queue this request
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => api(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      // Notify the auth store that refresh is starting
      useAuthStore.getState().setIsRefreshing(true);

      try {
        if (process.env.NODE_ENV === 'development') {
          console.log('🔄 Attempting to refresh access token...');
        }

        await api.post('/api/auth/refresh');

        if (process.env.NODE_ENV === 'development') {
          console.log('✅ Token refreshed successfully');
        }

        processQueue();

        return api(originalRequest);
      } catch (refreshError) {
        if (process.env.NODE_ENV === 'development') {
          console.error('❌ Token refresh failed:', refreshError);
        }

        processQueue(refreshError);
        redirectToLogin();

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
        useAuthStore.getState().setIsRefreshing(false);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
