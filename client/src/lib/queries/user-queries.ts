import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import { useAuthStore } from '../../store/useAuthStore';
import {
  updateUserUsername,
  requestEmailChange,
  resendVerification,
  verifyEmailChange,
  getPendingEmailChange,
  cancelEmailChange,
} from '../api/endpoints';
import {
  UpdateUserResponse,
  EmailChangeResponse,
  EmailChangeRequest,
  VerifyEmailChangeRequest,
  VerifyEmailChangeResponse,
  ResendCodeResponse,
  CancelChangeResponse,
  GetPendingResponse,
} from '../../helper/type';
import { UpdateUserData, RequestEmailChangeData } from '../validators/user';

// Update User Profile Hook
export const useUpdateusername = (
  options?: UseMutationOptions<UpdateUserResponse, Error, UpdateUserData>
) => {
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation<UpdateUserResponse, Error, UpdateUserData>({
    mutationFn: updateUserUsername,
    retry: false,
    ...options,
    onSuccess: (response, variables, context) => {
      if (response.user) {
        setUser(response.user);
      }
      options?.onSuccess?.(response, variables, context);
    },
  });
};

// Request Email Change Hook
export const useRequestEmailChange = (
  options?: UseMutationOptions<EmailChangeResponse, Error, EmailChangeRequest>
) => {
  const queryClient = useQueryClient();

  return useMutation<EmailChangeResponse, Error, RequestEmailChangeData>({
    mutationFn: requestEmailChange,
    retry: false,
    onSuccess: (response, variables, context) => {
    
      queryClient.setQueryData(['pending-email-verification'], {
        pendingEmailChange: response.data, 
      });
      
      queryClient.invalidateQueries({ 
        queryKey: ['pending-email-verification'] 
      });
      
      options?.onSuccess?.(response, variables, context);
    },


    ...options,
  });
};

// Verify Email Change Hook
export const useVerifyEmailChange = (
  options?: UseMutationOptions<
    VerifyEmailChangeResponse,
    Error,
    VerifyEmailChangeRequest
  >
) => {
  const setUser = useAuthStore((state) => state.setUser);
  const queryClient = useQueryClient();

  return useMutation<
    VerifyEmailChangeResponse,
    Error,
    VerifyEmailChangeRequest
  >({
    mutationFn: verifyEmailChange,
    retry: false,
    onSuccess: (response, variables, context) => {
      if (response.user) {
        setUser(response.user);

        // Clear pending verification and update user data
        queryClient.removeQueries({ queryKey: ['pending-email-verification'] });
        queryClient.invalidateQueries({ queryKey: ['user-profile'] });
        queryClient.invalidateQueries({ queryKey: ['user'] });
      }
      options?.onSuccess?.(response, variables, context);
    },

    ...options,
  });
};

// Resend Verification Code Hook
export const useResendVerificationCode = (
  options?: UseMutationOptions<ResendCodeResponse, Error, void>
) => {
  const queryClient = useQueryClient();

  return useMutation<ResendCodeResponse, Error, void>({
    mutationFn: resendVerification,
    retry: false,
    onSuccess: (response, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: ['pending-email-verification'],
      });

      console.log('Verification code resent successfully:', response.message);
      options?.onSuccess?.(response, variables, context);
    },
    ...options,
  });
};

// Cancel Email Change Hook
export const useCancelEmailChange = (
  options?: UseMutationOptions<CancelChangeResponse, Error, void>
) => {
  const queryClient = useQueryClient();

  return useMutation<CancelChangeResponse, Error, void>({
    mutationFn: cancelEmailChange,
    retry: false,
    onSuccess: (response, variables, context) => {
      queryClient.removeQueries({ queryKey: ['pending-email-verification'] });
      queryClient.invalidateQueries({ queryKey: ['user'] });
      options?.onSuccess?.(response, variables, context);
    },
    ...options,
  });
};

// Query Hook for Pending Email Verification Status
export const useGetPendingEmailChange = () => {
  return useQuery<GetPendingResponse>({
    queryKey: ['pending-email-verification'],
    queryFn: getPendingEmailChange,
    staleTime: 30000,
    retry: false,
  });
};

// Custom Hook for Email Change Flow Management
export const useEmailChangeFlow = () => {
  const requestEmailChange = useRequestEmailChange();
  const verifyEmailChange = useVerifyEmailChange();
  const resendCode = useResendVerificationCode();
  const cancelChange = useCancelEmailChange();
  const { data: pendingData } = useGetPendingEmailChange(); 

  return {
    // Actions
    requestChange: requestEmailChange.mutate,
    verifyChange: verifyEmailChange.mutate,
    resendCode: resendCode.mutate,
    cancelChange: cancelChange.mutate,

    // States
    isPendingRequest: requestEmailChange.isPending,
    isPendingCancel: cancelChange.isPending,
    isVerifying: verifyEmailChange.isPending, 
    isResending: resendCode.isPending, 

   
    pendingVerification: pendingData?.pendingEmailChange ?? null,
    hasPendingVerification: !!pendingData?.pendingEmailChange, 

    // Errors
    requestError: requestEmailChange.error,
    cancelError: cancelChange.error,

    // Reset functions
    resetRequestError: requestEmailChange.reset,
    resetCancelError: cancelChange.reset,
  };
};