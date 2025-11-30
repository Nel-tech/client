import {
  useQuery,
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query';

import {
  getPendingTracks,
  getTracksByStatus,
  ApproveTrack,
  RejectTrack,
} from '../api/endpoints/admin/admin';

import { UploadTrackResponse } from '../api/endpoints/track/type';

export const usePendingTracks = () => {
  return useQuery<UploadTrackResponse, Error>({
    queryKey: ['PendingTracks'],
    queryFn: getPendingTracks,
    staleTime: 2 * 60 * 1000,
    retry: 1,
  });
};

export const useTracksByStatus = () => {
  return useQuery<UploadTrackResponse, Error>({
    queryKey: ['TracksStatus'],
    queryFn: getTracksByStatus,
    staleTime: 2 * 60 * 1000,
    retry: 1,
  });
};

export const useApproveTrack = (
  options?: UseMutationOptions<UploadTrackResponse, Error, string>
) => {
  const queryClient = useQueryClient();

  return useMutation<UploadTrackResponse, Error, string>({
    mutationFn: (trackId: string) => ApproveTrack(trackId),
    onSuccess: (data, variables, context) => {
      // Invalidate and refetch tracks list
      queryClient.invalidateQueries({ queryKey: ['tracks'] });
      queryClient.invalidateQueries({ queryKey: ['track', variables] });

      // Call custom onSuccess if provided
      options?.onSuccess?.(data, variables, context);
    },
  });
};

export const useRejectTrack = (
  options?: UseMutationOptions<UploadTrackResponse, Error, string>
) => {
  const queryClient = useQueryClient();

  return useMutation<UploadTrackResponse, Error, string>({
    mutationFn: (trackId: string) => RejectTrack(trackId),
    onSuccess: (data, variables, context) => {
      // Invalidate and refetch tracks list
      queryClient.invalidateQueries({ queryKey: ['tracks'] });
      queryClient.invalidateQueries({ queryKey: ['track', variables] });

      // Call custom onSuccess if provided
      options?.onSuccess?.(data, variables, context);
    },
  });
};
