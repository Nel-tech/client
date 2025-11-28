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

    // Store current path for redirect after login
    sessionStorage.setItem('redirectAfterLogin', currentPath);

    // Hard redirect to login
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
          console.log(
            '🔐 Refresh failed or no refresh token, redirecting to login'
          );
          redirectToLogin();
        }
        return Promise.reject(error);
      }

      // If already refreshing, queue this request
      if (isRefreshing) {
        console.log('⏳ Token refresh in progress, queueing request');
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            console.log('✅ Retrying queued request after token refresh');
            return api(originalRequest);
          })
          .catch((err) => {
            console.error('❌ Queued request failed:', err);
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      console.log('🔄 Starting token refresh...');

      // Notify the auth store that refresh is starting
      useAuthStore.getState().setIsRefreshing(true);

      try {
        // Attempt to refresh the token
        await api.post('/api/auth/refresh');

        console.log('✅ Token refreshed successfully');

        // Process all queued requests
        processQueue();

        // Retry the original request with new token
        return api(originalRequest);
      } catch (refreshError) {
        console.error('❌ Token refresh failed:', refreshError);

        // Reject all queued requests
        processQueue(refreshError);

        // Redirect to login
        redirectToLogin();

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
        useAuthStore.getState().setIsRefreshing(false);
        console.log('🏁 Token refresh process completed');
      }
    }

    return Promise.reject(error);
  }
);

export default api;
