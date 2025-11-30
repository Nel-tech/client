import {
  useQuery,
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import useProfileStore from '@/store/useProfileStore';
import { useAuthStore } from '@/store/useAuthStore';
import {
  getProfileCompletionStatus,
  ArtistOnboarding,
  updateArtistProfile,
} from '../api/endpoints/artist/artist';
import { uploadProfileImage } from '../api/endpoints/artist/artist';
import { TOnboardingSchema } from '../validators/auth';
import { OnboardingResponse } from '../api/endpoints/artist/type';
import { ProfilePictureRequest, ProfilePictureResponse, UpdateArtistRequest } from '../api/endpoints/artist/type';
import { useUpdateArtistProfile as useUpdateArtistProfileStore } from '@/store/useProfileStore';
export const useArtistOnboarding = (
  options?: UseMutationOptions<OnboardingResponse, Error, TOnboardingSchema>
) => {
  const setProfile = useProfileStore((state) => state.setArtistProfile);
  const setUser = useAuthStore((state) => state.setUser); 
  const currentUser = useAuthStore((state) => state.user); 

  return useMutation<OnboardingResponse, Error, TOnboardingSchema>({
    mutationFn: ArtistOnboarding,
    retry: false,
    onSuccess: (response, variables, context) => {
      // Update ProfileStore
      const updatedArtist = {
        ...response.artist,
        hasOnboarded: true,
      };
      setProfile(updatedArtist);

      // ✅ CRITICAL FIX: Update AuthStore too!
      if (currentUser) {
        setUser({
          ...currentUser,
          hasOnboarded: true,
        });
      }

      console.log('✅ Onboarding complete - both stores updated');

      options?.onSuccess?.(response, variables, context);
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
      options?.onSuccess?.(response, variables, context);
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
      if (response?.artistProfile) {
        console.log('Updating store with:', response.artistProfile);
        updateArtistProfileStore(response.artistProfile);
      }
      queryClient.invalidateQueries({ queryKey: ['profileCompletionStatus'] });

      options?.onSuccess?.(response, variables, context);
    },
  });
};
