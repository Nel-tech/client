import { api } from '../../index';

import {
  UpdateTrackDetailsRequest,
  UploadTrackResponse,
  GetTracksResponse,
  DeleteTrackResponse,
  PermissionsResponse,
  UploadTrackData,
} from '@/helper/type';


export const uploadTrack = async (
  data: UploadTrackData
): Promise<UploadTrackResponse> => {
  const formData = new FormData();
  formData.append('title', data.title);
  formData.append('genre', data.genre);
  formData.append('consent', String(data.consent));
  if (!data.track) {
    throw new Error('A track file must be provided.');
  }
  formData.append('track', data.track);

  if (data.description) {
    formData.append('description', data.description);
  }

  if (data.thumbnail) {
    formData.append('thumbnail', data.thumbnail);
  }

  const response = await api.post<UploadTrackResponse>(
    '/api/artist/tracks/upload',
    formData
  );

  return response.data;
};

/**
 * Get all tracks for current artist
 */
export const getCurrentArtistTracks = async (): Promise<GetTracksResponse> => {
  const response = await api.get<GetTracksResponse>('/api/artist/tracks'); // ✅ Fixed: Match your route
  return response.data;
};

/**
 * Get single track details
 */
export const getTrackById = async (
  trackId: string
): Promise<UploadTrackResponse> => {
  const response = await api.get(`/api/artist/tracks/${trackId}`);
  console.log("Response", response.data)
  return response.data;
};


export const updateTrackDetails = async (
  data: UpdateTrackDetailsRequest
): Promise<UploadTrackResponse> => {
  const { trackId, thumbnail, ...updateData } = data;

  console.log('🔍 Update data:', { trackId, thumbnail, updateData });

  // If thumbnail exists, send as FormData
  if (thumbnail) {
    const formData = new FormData();

    if (updateData.title) formData.append('title', updateData.title);
    if (updateData.description)
      formData.append('description', updateData.description);
    if (updateData.genre) formData.append('genre', updateData.genre);

    formData.append('thumbnail', thumbnail);

    console.log('📤 Sending FormData with thumbnail');

    const response = await api.patch(
      `/api/artist/tracks/${trackId}`,
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );

    return response.data;
  }

  // If no thumbnail, send as JSON
  console.log('📤 Sending JSON without thumbnail');
  const response = await api.patch(`/api/artist/tracks/${trackId}`, updateData);

  return response.data;
};



export const deleteTrack = async (
  trackId: string
): Promise<DeleteTrackResponse> => {
  const response = await api.delete<DeleteTrackResponse>(
    `/api/artist/tracks/${trackId}`
  );
  return response.data;
};

/**
 * Get artist permissions
 */
export const getPermissions = async (): Promise<PermissionsResponse> => {
  const response = await api.get<PermissionsResponse>(
    '/api/artist/permissions'
  );
  return response.data;
};

