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

    // Don't redirect if already on auth pages
    if (currentPath.startsWith('/auth/')) {
      console.log('⚠️ Already on auth page, skipping redirect');
      return;
    }

    console.log('🔐 Redirecting to login from:', currentPath);

    // Clear auth state
    useAuthStore.getState().clearAuth();

    // Store current path for redirect after login
    sessionStorage.setItem('redirectAfterLogin', currentPath);

    // Hard redirect to login
    window.location.replace('/auth/login');
  }
};

// ✅ REQUEST INTERCEPTOR - Clean version
api.interceptors.request.use(
  (config) => {
    console.log('📤 Request:', config.method?.toUpperCase(), config.url);
    // ✅ REMOVED: document.cookie check (httpOnly cookies are invisible to JS)
    // Cookies are automatically sent via withCredentials: true
    return config;
  },
  (error) => {
    console.error('❌ Request error:', error);
    return Promise.reject(error);
  }
);

// ✅ RESPONSE INTERCEPTOR
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ErrorResponse>) => {
    console.log('🚨 Error intercepted:', {
      status: error.response?.status,
      url: error.config?.url,
      code: error.response?.data?.code,
    });

    // No response or no config = can't retry
    if (!error.response || !error.config) {
      return Promise.reject(error);
    }

    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Only handle 401 errors that haven't been retried
    if (error.response.status === 401 && !originalRequest._retry) {
      const errorData = error.response.data;

      // ✅ Skip refresh for special cases
      const shouldSkipRefresh =
        errorData?.code === 'EMAIL_NOT_VERIFIED' ||
        errorData?.code === 'NO_REFRESH_TOKEN' ||
        errorData?.code === 'REFRESH_FAILED' ||
        originalRequest.url?.includes('/auth/refresh') ||
        originalRequest.url?.includes('/auth/login');

      if (shouldSkipRefresh) {
        console.log('⚠️ Skipping refresh:', errorData?.code || 'auth endpoint');

        // Redirect to login if refresh failed or no refresh token
        if (
          originalRequest.url?.includes('/auth/refresh') ||
          errorData?.code === 'NO_REFRESH_TOKEN' ||
          errorData?.code === 'REFRESH_FAILED'
        ) {
          redirectToLogin();
        }
        return Promise.reject(error);
      }

      // ✅ Queue requests if refresh is already in progress
      if (isRefreshing) {
        console.log('⏳ Refresh in progress, queueing request');
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => api(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      // ✅ Start refresh process
      originalRequest._retry = true;
      isRefreshing = true;

      console.log('🔄 Starting token refresh...');
      useAuthStore.getState().setIsRefreshing(true);

      try {
        // ✅ Call refresh endpoint (refreshToken cookie sent automatically)
        await api.post('/api/auth/refresh');

        console.log('✅ Token refreshed successfully');

        // Process queued requests
        processQueue();

        // Retry original request with new accessToken cookie
        return api(originalRequest);
      } catch (refreshError) {
        console.error('❌ Token refresh failed');

        // Reject all queued requests
        processQueue(refreshError);

        // Redirect to login
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
