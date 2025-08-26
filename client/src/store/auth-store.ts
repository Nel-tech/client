import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { api } from '../lib/api';
import { User } from '@prisma/client';
interface AuthState {
  user: User | null;
  token: string | null;
  actions: {
    login: (user: User, token: string) => void;
    logout: () => void;
    setUser: (user: User | null) => void;
  };
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,

      // We group all actions under a single 'actions' property for clarity
      actions: {
        login: (user, token) => {
          // Set the Authorization header for all subsequent axios requests
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

          set({ user, token });
        },
        logout: () => {
          // Remove the Authorization header
          delete api.defaults.headers.common['Authorization'];

          set({ user: null, token: null });
        },
        // Action to update user details without re-logging in (e.g., after a profile update)
        setUser: (user) => {
          set({ user });
        },
      },
    }),
    // The second argument to persist is the configuration object
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),

      partialize: (state) => ({ user: state.user, token: state.token }),
    }
  )
);

export const useIsAuthenticated = () => {
  const token = useAuthStore((state) => state.token);

  return !!token;
};

export const useAuthActions = () => {
  return useAuthStore((state) => state.actions);
};
