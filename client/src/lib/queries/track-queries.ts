import {
  useQuery,
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query';

import {
  uploadTrack,
  getCurrentArtistTracks,
  getTrackById,
  updateTrackDetails,
  deleteTrack,
  getPermissions,
} from '../../lib/api/endpoints';
import {

  UpdateTrackDetailsRequest,
  UploadTrackResponse,
  GetTracksResponse,
  DeleteTrackResponse,
  PermissionsResponse,
  UploadTrackData,
} from '../../helper/type';
// ============================================
// QUERY HOOKS (for fetching data)
// ============================================

/**
 * Get all tracks for current artist
 */
export const useCurrentArtistTracks = () => {
  return useQuery<GetTracksResponse, Error>({
    queryKey: ['artistTracks'], 
    queryFn: getCurrentArtistTracks,
    staleTime: 2 * 60 * 1000, // 2 minutes
    retry: 1,
  });
};

/**
 * Get single track by ID
 */
export const useTrackById = (trackId: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['track', trackId],
    queryFn: () => getTrackById(trackId),
    enabled: enabled && !!trackId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Get artist permissions
 */
export const useArtistPermissions = () => {
  return useQuery<PermissionsResponse, Error>({
    queryKey: ['artistPermissions'],
    queryFn: getPermissions,
    staleTime: 10 * 60 * 1000, // 10 minutes (permissions don't change often)
  });
};

// ============================================
// MUTATION HOOKS (for creating/updating/deleting)
// ============================================

/**
 * Upload a new track
 */
export const useUploadTrack = (
  options?: UseMutationOptions<UploadTrackResponse, Error, UploadTrackData>
) => {
  const queryClient = useQueryClient();


  return useMutation<UploadTrackResponse, Error, UploadTrackData>({
    mutationFn: uploadTrack,
    onSuccess: (data, variables, context) => {
      // Invalidate and refetch tracks list
      queryClient.invalidateQueries({ queryKey: ['artistTracks'] });

      // Call custom onSuccess if provided
      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
};

/**
 * Update track details
 */
export const useUpdateTrackDetails = (
  options?: UseMutationOptions<any, Error, UpdateTrackDetailsRequest>
) => {
  const queryClient = useQueryClient(); 

  return useMutation<any, Error, UpdateTrackDetailsRequest>({
    mutationFn: (data: UpdateTrackDetailsRequest) => updateTrackDetails(data), // ✅ Fixed
    onSuccess: (data, variables, context) => {
      // ✅ Fixed: using variables.id instead of variables
      queryClient.invalidateQueries({ queryKey: ['track', variables.trackId] });
      
      // Invalidate the track list
      queryClient.invalidateQueries({ queryKey: ['artistTracks'] });

      // Call custom onSuccess if provided
      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
};

/**
 * Delete a track
 */
export const useDeleteTrack = (
  options?: UseMutationOptions<DeleteTrackResponse, Error, string>
) => {
  const queryClient = useQueryClient();

  return useMutation<DeleteTrackResponse, Error, string>({
    mutationFn: deleteTrack,
    onSuccess: (data, trackId, context) => {
      queryClient.removeQueries({ queryKey: ['track', trackId] });

    
      queryClient.invalidateQueries({ queryKey: ['artistTracks'] });

    
      options?.onSuccess?.(data, trackId, context);
    },
    ...options,
  });
};
