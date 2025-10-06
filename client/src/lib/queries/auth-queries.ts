import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { useAuthStore } from '../../store/useAuthStore';
import { logoutApi, resendVerificationCode, verifyEmail } from '../api';
import {
  TRegistrationSchema,
  TLoginSchema,
} from '../validators/auth';
import { toast } from 'sonner';
import { BaseUser } from '@/helper/type';
import { getRegistrationErrorMessage, getLoginErrorMessage } from './Error';

const setCookie = (name: string, value: string, days: number = 30) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/; SameSite=Strict`;
};

const removeCookie = (name: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/; SameSite=Strict`;
};

const setUserRoleCookie = (role: string) => {
  setCookie('userRole', role, 30);
};

const removeUserRoleCookie = () => {
  removeCookie('userRole');
};

export const useRegister = (
  options?: UseMutationOptions<any, Error, TRegistrationSchema>
) => {
  const registerAction = useAuthStore((state) => state.registerAction);

  return useMutation<any, Error, TRegistrationSchema>({
    mutationFn: registerAction,
    retry: false,
    onSuccess: (response, variables, context) => {
      options?.onSuccess?.(response, variables, context);
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
export const useEmailVerification = () => {
  const verifyEmailAction = useAuthStore((state) => state.verifyEmailAction);
  return useMutation({
    mutationFn: verifyEmailAction,
    retry: false,
    onError: (error: any) => {
      console.error(
        'Email verification error:',
        error.response?.data?.error || error.message
      );
      toast.error(
        error.response?.data?.error || 'Email verification failed. Please try again.',
        { duration: 6000 }
      );
    },
  });
};

export const useResendVerification = () => {
  return useMutation({
    mutationFn: resendVerificationCode,
    retry: false,
    onError: (error: any) => {
      console.error(
        'Resend verification error:',
        error.response?.data?.error || error.message
      );
    },
  });
};

export const useLogin = (
  options?: UseMutationOptions<BaseUser, Error, TLoginSchema>
) => {
  const loginAction = useAuthStore((state) => state.loginAction);

  return useMutation<BaseUser, Error, TLoginSchema>({
    mutationFn: async (data) => {
      await loginAction(data);
      return new Promise<BaseUser>((resolve, reject) => {
        const checkUser = () => {
          const state = useAuthStore.getState();
          if (state.user && state.initialized) {
            resolve(state.user);
          } else if (state.error) {
            reject(new Error(state.error));
          } else {
            setTimeout(checkUser, 10);
          }
        };
        checkUser();
      });
    },
    retry: false,
    onSuccess: (user, variables, context) => {
      if (user?.role) {
        setUserRoleCookie(user.role);
      }
      toast.success(`Welcome back, ${user.username}!`);
      options?.onSuccess?.(user, variables, context);
    },
    onError: (error: any, variables, context) => {
      console.error('❌ Login error:', error);
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
      await logoutApi();
      await logout();
    },
    retry: false,
    onSuccess: (data, variables, context) => {
      removeUserRoleCookie();
      toast.success('Logged out successfully');
      window.location.replace('/auth/login');

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
