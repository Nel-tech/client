import { api } from '../../index';
import { UploadTrackResponse } from '../track/type';
export const getPendingTracks = async (): Promise<UploadTrackResponse> => {
  const response = await api.get<UploadTrackResponse>(
    '/api/admin/tracks/pending'
  );

  return response.data;
};

export const getTracksByStatus = async (): Promise<UploadTrackResponse> => {
  const response = await api.get<UploadTrackResponse>('/api/admin/tracks/');
  return response.data;
};

export const ApproveTrack = async (
  trackId: string
): Promise<UploadTrackResponse> => {
  const response = await api.post<UploadTrackResponse>(
    `/api/admin/tracks/${trackId}/approve`
  );

  return response.data;
};

export const RejectTrack = async (
  trackId: string
): Promise<UploadTrackResponse> => {
  const response = await api.post<UploadTrackResponse>(
    `/api/admin/tracks/${trackId}/reject`
  );
  return response.data;
};
