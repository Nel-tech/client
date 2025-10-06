import {
  useQuery,
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { useAuthStore } from '../../store/useAuthStore';
import {
  getProfileCompletionStatus,
  ArtistOnboarding,
  uploadProfileImage,
  updateArtistProfile,
} from '../api';
import { TOnboardingSchema } from '../validators/auth';
import { toast } from 'sonner';
import {
  OnboardingResponse,
  ProfilePictureResponse,
  ProfilePictureRequest,
  UpdateArtistRequest,
} from '@/helper/type';
import { useUpdateArtistProfile as useUpdateArtistProfileStore } from '@/store/useProfileStore';

const setCookie = (name: string, value: string, days: number = 30) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/; SameSite=Strict`;
};

const setUserRoleCookie = (role: string) => {
  setCookie('userRole', role, 30);
};

export const useArtistOnboarding = (
  options?: UseMutationOptions<OnboardingResponse, Error, TOnboardingSchema>
) => {
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation<OnboardingResponse, Error, TOnboardingSchema>({
    mutationFn: ArtistOnboarding,
    retry: false,
    onSuccess: (response, variables, context) => {
      if (response.role) {
        setUserRoleCookie(response.role);
      }
      setUser(response.artist);
      options?.onSuccess?.(response, variables, context);
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

export const useProfilePictureUpload = (
  options?: UseMutationOptions<
    ProfilePictureResponse,
    Error,
    ProfilePictureRequest
  >
) => {
  const queryClient = useQueryClient();

  return useMutation<ProfilePictureResponse, Error, ProfilePictureRequest>({
    mutationFn: uploadProfileImage,
    retry: false,
    onSuccess: (response, variables, context) => {
      // Invalidate and refetch related queries
      queryClient.invalidateQueries({ queryKey: ['artist-profile'] });
      queryClient.invalidateQueries({ queryKey: ['user-profile'] });

      // Optionally update cache directly for immediate UI update
      queryClient.setQueryData(['artist-profile'], (oldData: any) => {
        if (oldData?.artist) {
          return {
            ...oldData,
            artist: {
              ...oldData.artist,
              profilePic: response.profilePic,
            },
          };
        }
        return oldData;
      });

      // Call custom onSuccess if provided
      options?.onSuccess?.(response, variables, context);
    },
    onError: (error, variables, context) => {
      const message =
        error.message || 'Failed to update profile picture. Please try again.';
      toast.error(message, { duration: 5000 });

      // Call custom onError if provided
      options?.onError?.(error, variables, context);
    },
    ...options,
  });
};

export const useProfileCompletionStatus = () => {
  return useQuery({
    queryKey: ['profileCompletionStatus'],
    queryFn: getProfileCompletionStatus,
    staleTime: 2 * 60 * 1000, 
    retry: 1,
  });
};

export const useUpdateArtistProfile = (
  options?: UseMutationOptions<any, Error, UpdateArtistRequest>
) => {
  const queryClient = useQueryClient();
  const updateArtistProfileStore = useUpdateArtistProfileStore();

  return useMutation({
    mutationFn: updateArtistProfile,
    retry: false,
    onSuccess: (response, variables, context) => {
      console.log('Mutation success, response:', response);

      // Update Zustand store
      if (response?.artistProfile) {
        console.log('Updating store with:', response.artistProfile);
        updateArtistProfileStore(response.artistProfile);
      }
      queryClient.invalidateQueries({ queryKey: ['profileCompletionStatus'] });

      options?.onSuccess?.(response, variables, context);
    },
    onError: (error, variables, context) => {
      console.error('Artist profile update error:', error.message);
      options?.onError?.(error, variables, context);
    },
  });
};