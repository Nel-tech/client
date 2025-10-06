import { create } from 'zustand';
import { BaseUser } from '@/helper/type';
import { getCurrentUser, logoutApi, login, verifyEmail, register } from '@/lib/api';
import { TRegistrationSchema, TLoginSchema } from '@/lib/validators/auth';

interface AuthState {
  user: BaseUser | null;
  loading: boolean;
  initialized: boolean;
  error: string | null;
  pendingVerificationEmail: string | null;
}

interface AuthActions {
  registerAction: (data: TRegistrationSchema) => Promise<void>;
  verifyEmailAction: (data: { email: string; code: string }) => Promise<void>;
  loginAction: (data: TLoginSchema) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: BaseUser | null) => void;
  initializeAuth: () => Promise<void>;
  clearAuth: () => void;
  clearError: () => void;
  clearPendingVerification: () => void;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()((set, get) => ({
  // State
  user: null,
  loading: false,
  initialized: false,
  error: null,
  pendingVerificationEmail: null,

  // Actions
  registerAction: async (data) => {
    set({ loading: true, error: null });
    try {
      const response = await register(data);

      // Backend returns { email, requiresVerification: true }
      if (response.requiresVerification) {
        set({
          loading: false,
          initialized: true,
          error: null,
          pendingVerificationEmail: response.email,
        });
      }
    } catch (err) {
      console.error('Register failed:', err);
      set({
        loading: false,
        error: err instanceof Error ? err.message : 'Register failed',
      });
      throw err; 
    }
  },

  verifyEmailAction: async (data: { email: string; code: string }) => {
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
    } catch (err) {
      set({
        loading: false,
        error: err instanceof Error ? err.message : 'Verification failed',
      });
      throw err;
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
      });
    } catch (err) {
      console.error('Login failed:', err);
      set({
        loading: false,
        error: err instanceof Error ? err.message : 'Login failed',
      });
      throw err;
    }
  },

  logout: async () => {
    set({ loading: true });
    try {
      await logoutApi();
      set({
        user: null,
        loading: false,
        initialized: true,
        error: null,
        pendingVerificationEmail: null,
      });
    } catch (error) {
      console.error('Logout error:', error);
      set({
        user: null,
        loading: false,
        initialized: true,
        error: 'Logout failed',
      });
    }
  },

  setUser: (user) => {
    set({ user, initialized: true, error: null });
  },

  initializeAuth: async () => {
    const currentState = get();

    if (currentState.loading) {
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
    } catch (error) {
      console.error('Auth initialization failed:', error);
      set({
        user: null,
        loading: false,
        initialized: true,
        error:
          error instanceof Error ? error.message : 'Auth initialization failed',
      });
    }
  },

  clearAuth: () => {
    set({
      user: null,
      loading: false,
      initialized: false,
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
