// import {
//   useMutation,
//   UseMutationOptions,
//   useQueryClient,
// } from '@tanstack/react-query';
// import useProfileStore from '@/store/useProfileStore';
// import { useAuthStore } from '@/store/useAuthStore';
// import { FanOnboarding, updateFanProfile } from '../api/endpoints/fan/fan';
// import { FanOnboardingResponse } from '../api/endpoints/fan/type';
// import { ProfilePictureResponse, ProfilePictureRequest, UpdateFanRequest } from '../api/endpoints/fan/type';
// import { FOnboardingSchema } from '../validators/auth';
// import { uploadProfileImage } from '../api/endpoints/fan/fan';
// import { useUpdateFanProfile } from '@/store/useProfileStore';
// export const useFanOnboarding = (
//   options?: UseMutationOptions<FanOnboardingResponse, Error, FOnboardingSchema>
// ) => {
//   const setProfile = useProfileStore((state) => state.setFanProfile);
//   const setUser = useAuthStore((state) => state.setUser);
//   const currentUser = useAuthStore((state) => state.user);

//   return useMutation<FanOnboardingResponse , Error, FOnboardingSchema>({
//     mutationFn: FanOnboarding,
//     retry: false,
//     onSuccess: (response, variables, context) => {
//       const updatedFan = {
//         ...response.fan,
//         hasOnboarded: true,
//       };
//       setProfile(updatedFan);
//       if (currentUser) {
//         setUser({
//           ...currentUser,
//           hasOnboarded: true,
//         });
//       }

//       options?.onSuccess?.(response, variables, context);
//     },
//     ...options,
//   });
// };

// export const useProfilePictureUpload = (
//   options?: UseMutationOptions<
//     ProfilePictureResponse,
//     Error,
//     ProfilePictureRequest
//   >
// ) => {
//   const queryClient = useQueryClient();

//   return useMutation<ProfilePictureResponse, Error, ProfilePictureRequest>({
//     mutationFn: uploadProfileImage,
//     retry: false,
//     onSuccess: (response, variables, context) => {
//       // Invalidate and refetch related queries
//       queryClient.invalidateQueries({ queryKey: ['fan-profile'] });
//       queryClient.invalidateQueries({ queryKey: ['user-profile'] });

//       // Optionally update cache directly for immediate UI update
//       queryClient.setQueryData(['fan-profile'], (oldData: any) => {
//         if (oldData?.fan) {
//           return {
//             ...oldData,
//             fan: {
//               ...oldData.fan,
//               profilePic: response.profilePic,
//             },
//           };
//         }
//         return oldData;
//       });
//       options?.onSuccess?.(response, variables, context);
//     },

//     ...options,
//   });
// };

// export const useFanProfile = (
//   options?: UseMutationOptions<any, Error, UpdateFanRequest>
// ) => {
//   const queryClient = useQueryClient();
//   const updateFanProfileStore = useUpdateFanProfile();

//   return useMutation({
//     mutationFn: updateFanProfile,
//     retry: false,
//     onSuccess: (response, variables, context) => {
//       if (response?.fanProfile) {
//         console.log('Updating store with:', response.fanProfile);
//         updateFanProfileStore(response.fanProfile);
//       }
//       queryClient.invalidateQueries({ queryKey: ['fan-profile'] });

//       options?.onSuccess?.(response, variables, context);
//     },
//   });
// };
