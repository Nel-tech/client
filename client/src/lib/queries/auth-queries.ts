import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { useAuthStore } from '../../store/useAuthStore';
import { logoutApi, resendVerificationCode } from '../api/endpoints/user/user';
import { TRegistrationSchema, TLoginSchema } from '../validators/auth';
import { toast } from 'sonner';
import { BaseUser } from '@/lib/api/endpoints/user/type';
import { useRouter } from 'next/navigation';
// Response types
interface RegisterResponse {
  message: string;
  email: string;
  requiresVerification: boolean;
}

interface VerifyEmailResponse {
  user: BaseUser;
  expiresIn: number;
}

interface ResendVerificationRequest {
  email: string;
}

interface ResendVerificationResponse {
  message: string;
}

interface ErrorResponse {
  error: string;
  code?: string;
  requiresVerification?: boolean;
  email?: string;
  message: string;
}

// ==================== REGISTER HOOK ====================
export const useRegister = (
  options?: UseMutationOptions<RegisterResponse, unknown, TRegistrationSchema>
) => {
  const registerAction = useAuthStore((state) => state.registerAction);

  return useMutation<RegisterResponse, unknown, TRegistrationSchema>({
    mutationFn: async (data) => {
      await registerAction(data);
      const state = useAuthStore.getState();
      return {
        message: 'Registration successful',
        email: state.pendingVerificationEmail || data.email,
        requiresVerification: true,
      };
    },
    retry: false,
    onSuccess: (response, variables, context) => {
      toast.success('Registration successful! Please check your email.');
      options?.onSuccess?.(response, variables, context);
    },

    ...options,
  });
};


// ==================== EMAIL VERIFICATION HOOK ====================
export const useEmailVerification = (
  options?: UseMutationOptions<
    VerifyEmailResponse,
    unknown,
    { email: string; code: string }
  >
) => {
  const verifyEmailAction = useAuthStore((state) => state.verifyEmailAction);

  return useMutation<
    VerifyEmailResponse,
    unknown,
    { email: string; code: string}
  >({
    mutationFn: async (data) => {
      await verifyEmailAction(data);

      const { user } = useAuthStore.getState();
      if (!user) {
        throw {
          message: 'Verification succeeded but user not found',
        } as ErrorResponse;
      }

      return { user, expiresIn: 900 };
    },
    retry: false,
    ...options,
   
  });
};

// ==================== RESEND VERIFICATION HOOK ====================
export const useResendVerification = (
  options?: UseMutationOptions<
    ResendVerificationResponse,
    unknown,
    ResendVerificationRequest
  >
) => {
  return useMutation<
    ResendVerificationResponse,
    unknown,
    ResendVerificationRequest
  >({
    mutationFn: resendVerificationCode,
    retry: false,
    onSuccess: (response, variables, context) => {
      toast.success('Verification code sent! Please check your email.');
      options?.onSuccess?.(response, variables, context);
    },
   
    ...options,
  });
};

// ==================== LOGIN HOOK ====================
export const useLogin = (
  options?: UseMutationOptions<
    BaseUser,
    unknown,
    TLoginSchema
  >
) => {
  const loginAction = useAuthStore((state) => state.loginAction);

  return useMutation<BaseUser, unknown, TLoginSchema>({
    mutationFn: async (data) => {
      await loginAction(data);
      // Wait for user to be set in store
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
      toast.success(`Welcome back, ${user.username}!`);
      options?.onSuccess?.(user, variables, context);
    },
   
    ...options,
  });
};

// ==================== LOGOUT HOOK ====================
export const useLogout = (
  options?: UseMutationOptions<void, unknown, void>
) => {
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  return useMutation<void, unknown, void>({
    mutationFn: async () => {
      await logoutApi();
      await logout();
    },
    retry: false,
    onSuccess: (data, variables, context) => {
      toast.success('Logged out successfully');
      router.replace('/auth/login');
      options?.onSuccess?.(data, variables, context);
    },
   
    ...options,
  });
};
