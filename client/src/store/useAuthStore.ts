import { create } from 'zustand';
import { AxiosError } from 'axios';
import { BaseUser } from '@/helper/type';
import {
  getCurrentUser,
  logoutApi,
  login,
  verifyEmail,
  register,
} from '@/lib/api/endpoints';
import { TRegistrationSchema, TLoginSchema } from '@/lib/validators/auth';

interface AuthState {
  user: BaseUser | null;
  loading: boolean;
  initialized: boolean;
  isRefreshing: boolean;
  error: string | null;
  pendingVerificationEmail: string | null;
}

interface AuthActions {
  registerAction: (data: TRegistrationSchema) => Promise<void>;
  verifyEmailAction: (data: {
    email: string;
    verificationCode: string;
  }) => Promise<void>;
  loginAction: (data: TLoginSchema) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: BaseUser | null) => void;
  initializeAuth: () => Promise<void>;
  clearAuth: () => void;
  clearError: () => void;
  clearPendingVerification: () => void;
  setIsRefreshing: (isRefreshing: boolean) => void;
}

type AuthStore = AuthState & AuthActions;

// Helper to extract error messages
const getErrorMessage = (error: unknown): string => {
  if (error instanceof AxiosError) {
    return error.response?.data?.error || error.message || 'An error occurred';
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unexpected error occurred';
};

export const useAuthStore = create<AuthStore>()((set, get) => ({
  // State
  user: null,
  loading: false,
  initialized: false,
  isRefreshing: false,
  error: null,
  pendingVerificationEmail: null,

  // Actions
  registerAction: async (data) => {
    set({ loading: true, error: null });
    try {
      const response = await register(data);

      if (response.requiresVerification) {
        set({
          loading: false,
          initialized: true,
          error: null,
          pendingVerificationEmail: response.email,
        });
      }
       console.log('Response User', response.user);
    } catch (error) {
      console.error('Register failed:', error);
      const errorMessage = getErrorMessage(error);
      set({
        loading: false,
        error: errorMessage,
      });
      throw error;
    }
  },

  verifyEmailAction: async (data: {
    email: string;
    verificationCode: string;
  }) => {
    set({ loading: true, error: null });
    try {
      const response = await verifyEmail(data);

      set({
        user: response.user,
        loading: false,
        initialized: true,
        error: null,
        pendingVerificationEmail: null,
      });

      console.log('Response User',response.user)
    } catch (error) {
      console.error('Verification failed:', error);
      const errorMessage = getErrorMessage(error);
      set({
        loading: false,
        error: errorMessage,
      });
      throw error;
    }
  },

  loginAction: async (data) => {
    set({ loading: true, error: null });
    try {
      const user = await login(data);
      set({
        user,
        loading: false,
        initialized: true,
        error: null,
        pendingVerificationEmail: null,
      });
       console.log('Response User LoginAction', user);
    } catch (error) {
      console.error('Login failed:', error);

      if (error instanceof AxiosError) {
        const errorData = error.response?.data;
        if (errorData?.requiresVerification) {
          set({
            loading: false,
            error: errorData.error || 'Please verify your email first',
            pendingVerificationEmail: errorData.email || data.email,
          });
          throw error;
        }
      }

      const errorMessage = getErrorMessage(error);
      set({
        loading: false,
        error: errorMessage,
      });
      throw error;
    }
  },

  logout: async () => {
    set({ loading: true, error: null });
    try {
      await logoutApi();
      set({
        user: null,
        loading: false,
        initialized: true, // Keep initialized as true
        error: null,
        pendingVerificationEmail: null,
      });
    } catch (error) {
      console.error('Logout error:', error);
      set({
        user: null,
        loading: false,
        initialized: true, // Keep initialized as true
        error: getErrorMessage(error),
      });
    }
  },

  setUser: (user) => {
    set({ user, initialized: true, error: null });
  },

  initializeAuth: async () => {
    const currentState = get();

    // Prevent multiple simultaneous initializations
    if (currentState.loading) {
      console.log('⏸️ Init already in progress');
      return;
    }

    // Don't re-initialize if already done
    if (currentState.initialized) {
      console.log('✅ Already initialized');
      return;
    }

    // Don't initialize if we're refreshing tokens
    if (currentState.isRefreshing) {
      console.log('⏸️ Skipping initializeAuth - token refresh in progress');
      return;
    }

    set({ loading: true, error: null });

    try {
      const user = await getCurrentUser();
      set({
        user,
        loading: false,
        initialized: true,
        error: null,
      });
      console.log('✅ Auth initialized successfully');
      console.log("CurrentUser", user)
    } catch (error) {
      console.error('Auth initialization failed:', error);

      // If it's a 401 error, user is not authenticated (this is expected)
      if (error instanceof AxiosError && error.response?.status === 401) {
        set({
          user: null,
          loading: false,
          initialized: true,
          error: null,
        });
        console.log('ℹ️ No active session');
        return;
      }

      // For other errors, set error message
      const errorMessage = getErrorMessage(error);
      set({
        user: null,
        loading: false,
        initialized: true,
        error: errorMessage,
      });
    }
  },

  clearAuth: () => {
    const currentState = get();

    console.log('🗑️ clearAuth called');

    // CRITICAL: Don't clear auth if we're in the middle of refreshing tokens
    if (currentState.isRefreshing) {
      console.warn(
        '⚠️ Attempted to clear auth during token refresh - ignoring'
      );
      return;
    }

    // IMPORTANT: Keep initialized as true to prevent re-initialization
    set({
      user: null,
      loading: false,
      initialized: true, // Changed from false to true
      isRefreshing: false,
      error: null,
      pendingVerificationEmail: null,
    });
  },

  clearError: () => {
    set({ error: null });
  },

  clearPendingVerification: () => {
    set({ pendingVerificationEmail: null });
  },

  setIsRefreshing: (isRefreshing: boolean) => {
    console.log(`🔄 setIsRefreshing: ${isRefreshing}`);
    set({ isRefreshing });
  },
}));

// Selectors
export const useAuthUser = () => useAuthStore((state) => state.user);
export const useAuthLoading = () => useAuthStore((state) => state.loading);
export const useAuthInitialized = () =>
  useAuthStore((state) => state.initialized);
export const useAuthError = () => useAuthStore((state) => state.error);
export const useIsAuthenticated = () =>
  useAuthStore((state) => state.initialized && !!state.user);
export const usePendingVerificationEmail = () =>
  useAuthStore((state) => state.pendingVerificationEmail);
export const useIsRefreshing = () =>
  useAuthStore((state) => state.isRefreshing);
