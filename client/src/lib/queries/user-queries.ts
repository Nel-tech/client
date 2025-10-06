import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import { useAuthStore } from '../../store/useAuthStore';
import {
  updateUserProfile,
  requestEmailChange,
  resendVerificationCode,
  verifyEmailChange,
  cancelEmailChange
} from '../api';
import {
  UpdateUserResponse,
  EmailChangeResponse,
  MessageResponse,
} from '../../helper/type';
import {
  UpdateUserData,
  RequestEmailChangeData,
  VerifyEmailChangeData,
} from '../validators/user';

// Update User Profile Hook
export const useUserUpdate = (
  options?: UseMutationOptions<UpdateUserResponse, Error, UpdateUserData>
) => {
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation<UpdateUserResponse, Error, UpdateUserData>({
    mutationFn: updateUserProfile,
    retry: false,
    ...options,
    onSuccess: (response, variables, context) => {
      if (response.user) {
        setUser(response.user);
      }
      options?.onSuccess?.(response, variables, context);
    },
    onError: (error, variables, context) => {
      const message =
        error.message || 'Something went wrong during profile update.';
      console.error('Profile update error:', message);
      options?.onError?.(error, variables, context);
    },
  });
};


// Request Email Change Hook
export const useRequestEmailChange = (
  options?: UseMutationOptions<
    EmailChangeResponse,
    Error,
    RequestEmailChangeData
  >
) => {
  const queryClient = useQueryClient();

  return useMutation<EmailChangeResponse, Error, RequestEmailChangeData>({
    mutationFn: requestEmailChange,
    retry: false,
    onSuccess: (response, variables, context) => {
      // Cache the pending verification state
      queryClient.setQueryData(
        ['pending-email-verification'],
        response.pendingVerification
      );
      options?.onSuccess?.(response, variables, context);
    },
    onError: (error, variables, context) => {
      const message = error.message || 'Failed to send email verification.';
      console.error('Email change request error:', message);
      options?.onError?.(error, variables, context);
    },
    ...options,
  });
};

// Verify Email Change Hook
export const useVerifyEmailChange = (
  options?: UseMutationOptions<UpdateUserResponse, Error, VerifyEmailChangeData>
) => {
  const setUser = useAuthStore((state) => state.setUser);
  const queryClient = useQueryClient();

  return useMutation<UpdateUserResponse, Error, VerifyEmailChangeData>({
    mutationFn: verifyEmailChange,
    retry: false,
    onSuccess: (response, variables, context) => {
      if (response.user) {
        setUser(response.user);

        // Clear pending verification and update user data
        queryClient.removeQueries({ queryKey: ['pending-email-verification'] });
        queryClient.invalidateQueries({ queryKey: ['user-profile'] });
        queryClient.invalidateQueries({ queryKey: ['artist-profile'] });
      }
      options?.onSuccess?.(response, variables, context);
    },
    onError: (error, variables, context) => {
      const message = error.message || 'Email verification failed.';
      console.error('Email verification error:', message);
      options?.onError?.(error, variables, context);
    },
    ...options,
  });
};

// Resend Verification Code Hook
export const useResendVerificationCode = (
  options?: UseMutationOptions<MessageResponse, Error, void>
) => {
  return useMutation<MessageResponse, Error, void>({
    mutationFn: resendVerificationCode,
    retry: false,
    onSuccess: (response, variables, context) => {
      console.log('Verification code resent successfully');
      options?.onSuccess?.(response, variables, context);
    },
    onError: (error, variables, context) => {
      const message = error.message || 'Failed to resend verification code.';
      console.error('Resend verification error:', message);
      options?.onError?.(error, variables, context);
    },
    ...options,
  });
};

// Cancel Email Change Hook
export const useCancelEmailChange = (
  options?: UseMutationOptions<MessageResponse, Error, void>
) => {
  const queryClient = useQueryClient();

  return useMutation<MessageResponse, Error, void>({
    mutationFn: cancelEmailChange,
    retry: false,
    onSuccess: (response, variables, context) => {
      // Clear pending verification from cache
      queryClient.removeQueries({ queryKey: ['pending-email-verification'] });
      options?.onSuccess?.(response, variables, context);
    },
    onError: (error, variables, context) => {
      const message = error.message || 'Failed to cancel email change.';
      console.error('Cancel email change error:', message);
      options?.onError?.(error, variables, context);
    },
    ...options,
  });
};

// Query Hook for Pending Email Verification Status
export const usePendingEmailVerification = () => {
  return useQuery({
    queryKey: ['pending-email-verification'],
    queryFn: () => null, // This is managed by the mutations above
    enabled: false, // Only updated by mutations, never fetched
    staleTime: Infinity, // Don't refetch automatically
  });
};

// Custom Hook for Email Change Flow Management
export const useEmailChangeFlow = () => {
  const requestEmailChange = useRequestEmailChange();
  const verifyEmailChange = useVerifyEmailChange();
  const resendCode = useResendVerificationCode();
  const cancelChange = useCancelEmailChange();
  const { data: pendingVerification } = usePendingEmailVerification();

  return {
    // Actions
    requestChange: requestEmailChange.mutate,
    verifyChange: verifyEmailChange.mutate,
    resendCode: resendCode.mutate,
    cancelChange: cancelChange.mutate,

    // States
    isPendingRequest: requestEmailChange.isPending,
    isPendingVerification: verifyEmailChange.isPending,
    isPendingResend: resendCode.isPending,
    isPendingCancel: cancelChange.isPending,

    // Data
    pendingVerification,
    hasPendingVerification: !!pendingVerification,

    // Errors
    requestError: requestEmailChange.error,
    verifyError: verifyEmailChange.error,
    resendError: resendCode.error,
    cancelError: cancelChange.error,

    // Reset functions
    resetRequestError: requestEmailChange.reset,
    resetVerifyError: verifyEmailChange.reset,
    resetResendError: resendCode.reset,
    resetCancelError: cancelChange.reset,
  };
};
