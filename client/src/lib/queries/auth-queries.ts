import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { register, login } from '../api';
import { useAuthStore } from '../../store/auth-store';
import { TRegistrationSchema, TLoginSchema } from '../validators/auth';
import { toast } from 'sonner';
import { User } from '@prisma/client';

interface AuthResponse {
  token: string;
  user: User;
}

export const useRegister = (
  // Allow the component to pass in its own options, like onSuccess
  options?: UseMutationOptions<AuthResponse, Error, TRegistrationSchema>
) => {
  const { login: storeLogin } = useAuthStore.getState().actions;

  return useMutation<AuthResponse, Error, TRegistrationSchema>({
    mutationFn: register,

    onSuccess: (data, variables, context) => {
      storeLogin(data.user, data.token);

      toast.success(
        `Welcome, ${data.user.username}! Your account has been created.`
      );

      if (options?.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },

    // --- Global Error Handling ---
    onError: (error: unknown, variables, context) => {
      const errorMessage =
        error.response?.data?.message ||
        'Registration failed. Please try again.';
      toast.error(errorMessage);

      if (options?.onError) {
        options.onError(error, variables, context);
      }
    },

    ...options,
  });
};

export const useLogin = (
  options?: UseMutationOptions<AuthResponse, Error, TLoginSchema>
) => {
  const { login: storeLogin } = useAuthStore.getState().actions;

  return useMutation<AuthResponse, Error, TLoginSchema>({
    mutationFn: login,
    onSuccess: (data, variables, context) => {
      storeLogin(data.user, data.token);
      toast.success(`Welcome back, ${data.user.username}!`);
      if (options?.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    onError: (error: any, variables, context) => {
      const errorMessage =
        error.response?.data?.message || 'Invalid email or password.';
      toast.error(errorMessage);
      if (options?.onError) {
        options.onError(error, variables, context);
      }
    },
    ...options,
  });
};
