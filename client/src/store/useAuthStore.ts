import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { User } from '@prisma/client';
import { getCurrentUser, logoutApi } from '@/lib/api';

interface AuthState {
  user: User | null;
  loading: boolean;
  initialized: boolean;
  error: string | null;
}

interface AuthActions {
  login: (user: User) => void;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
  initializeAuth: () => Promise<void>;
  clearAuth: () => void;
  clearError: () => void;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  devtools(
    (set, get) => ({
      // State
      user: null,
      loading: false,
      initialized: false,
      error: null,

      // Actions
      login: (user) => {
        set(
          { user, loading: false, initialized: true, error: null },
          false,
          'login'
        );
      },

      logout: async () => {
        set({ loading: true }, false, 'logout-start');
        try {
          await logoutApi();
          set(
            { user: null, loading: false, initialized: true, error: null },
            false,
            'logout-success'
          );
        } catch (error) {
          console.error('Logout error:', error);
          set(
            {
              user: null,
              loading: false,
              initialized: true,
              error: 'Logout failed',
            },
            false,
            'logout-error'
          );
        }
      },

      setUser: (user) => {
        set({ user, initialized: true, error: null }, false, 'setUser');
      },
      
      initializeAuth: async () => {
        const currentState = get();

        if (currentState.loading) {
          return;
        }

        set({ loading: true, error: null }, false, 'initializeAuth-start');

        try {
          const user = await getCurrentUser();
          set(
            {
              user,
              loading: false,
              initialized: true,
              error: null,
            },
            false,
            user ? 'initializeAuth-success' : 'initializeAuth-no-user'
          );
        } catch (error) {
          console.error('❌ Auth initialization failed:', error);
          set(
            {
              user: null,
              loading: false,
              initialized: true,
              error:
                error instanceof Error
                  ? error.message
                  : 'Auth initialization failed',
            },
            false,
            'initializeAuth-error'
          );
        }
      },

      clearAuth: () => {
        set(
          {
            user: null,
            loading: false,
            initialized: false,
            error: null,
          },
          false,
          'clearAuth'
        );
      },

      clearError: () => {
        set({ error: null }, false, 'clearError');
      },
    }),
    { name: 'auth-store' }
  )
);

// Enhanced selectors
export const useAuthUser = () => useAuthStore((state) => state.user);
export const useAuthLoading = () => useAuthStore((state) => state.loading);
export const useAuthInitialized = () =>
  useAuthStore((state) => state.initialized);
export const useAuthError = () => useAuthStore((state) => state.error);

// Computed selectors
export const useIsAuthenticated = () =>
  useAuthStore((state) => state.initialized && !!state.user);
