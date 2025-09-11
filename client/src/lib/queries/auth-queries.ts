// lib/queries/auth-queries.ts
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { register, login,logoutApi,ArtistOnboarding } from '../api';
import { useAuthStore } from '../../store/useAuthStore';
import { TRegistrationSchema, TLoginSchema, TOnboardingSchema } from '../validators/auth';
import { toast } from 'sonner';
import { User } from '@prisma/client';
import { getRegistrationErrorMessage, getLoginErrorMessage } from './Error';
import { OnboardingResponse } from '@/helper/helper';

// Cookie management utilities
const setCookie = (name: string, value: string, days: number = 30) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
};

const removeCookie = (name: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/; SameSite=Lax`;
};

// Set user role cookie for middleware
const setUserRoleCookie = (role: string) => {
  setCookie('userRole', role, 30);
};

// Remove user role cookie
const removeUserRoleCookie = () => {
  removeCookie('userRole');
};

export const useRegister = (
  options?: UseMutationOptions<User, Error, TRegistrationSchema>
) => {
  const login = useAuthStore((state) => state.login);

  return useMutation<User, Error, TRegistrationSchema>({
    mutationFn: register,

    onSuccess: (user, variables, context) => {
      if (user.role) {
        setUserRoleCookie(user.role);
      }
      login(user);

      options?.onSuccess?.(user, variables, context);
    },

    onError: (error: any, variables, context) => {
      console.error('Registration error:', error);
      const errorMessage = getRegistrationErrorMessage(error);
      toast.error(errorMessage, { duration: 6000 });
      options?.onError?.(error, variables, context);
    },

    ...options,
  });
};

export const useLogin = (
  options?: UseMutationOptions<User, Error, TLoginSchema>
) => {
  const loginStore = useAuthStore((state) => state.login);

  return useMutation<User, Error, TLoginSchema>({
    mutationFn: login, 

    onSuccess: (user, variables, context) => {
      if (user.role) {
        setUserRoleCookie(user.role);
      }
      loginStore(user);

      options?.onSuccess?.(user, variables, context);
    },

    onError: (error: any, variables, context) => {
      console.error('Login error:', error);
      const errorMessage = getLoginErrorMessage(error);
      toast.error(errorMessage, { duration: 6000 });
      options?.onError?.(error, variables, context);
    },

    ...options,
  });
};

export const useLogout = (options?: UseMutationOptions<void, Error, void>) => {
  const logout = useAuthStore((state) => state.logout);

  return useMutation<void, Error, void>({
    mutationFn: async () => {
      await logout();
    },

    onSuccess: (data, variables, context) => {
      // Remove user role cookie
      removeUserRoleCookie();

      // Clear auth store
      // The logout function in the store should handle this

      // Show success message
      toast.success('Logged out successfully');

      // Force a hard refresh to ensure middleware kicks in
      window.location.href = '/login';

      options?.onSuccess?.(data, variables, context);
    },

    onError: (error, variables, context) => {
      console.error('Logout error:', error);
      toast.error('Logout failed. Please try again.');
      options?.onError?.(error, variables, context);
    },

    ...options,
  });
};


// Onboarding hook
export const useArtistOnboarding = (
  options?: UseMutationOptions<OnboardingResponse, Error, TOnboardingSchema>
) => {
  return useMutation<OnboardingResponse, Error, TOnboardingSchema>({
    mutationFn: ArtistOnboarding,

    onSuccess: (data, variables, context) => {
      if (data.role) {
        setUserRoleCookie(data.role);
      }
      options?.onSuccess?.(data, variables, context);
    },

    onError: (error, variables, context) => {
      const message =
        error.message || 'Something went wrong during onboarding.';
      toast.error(message, { duration: 5000 });
      options?.onError?.(error, variables, context);
    },

    ...options,
  });
};
