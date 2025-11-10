import { api } from './index';
import {
  TRegistrationSchema,
  TLoginSchema,
  TOnboardingSchema,
} from '../validators/auth';

import {
  ProfilePictureResponse,
  ProfilePictureRequest,
  UpdateUserRequest,
  UpdateUserResponse,
  EmailChangeRequest,
  EmailVerification,
  EmailChangeResponse,
  UpdateArtistRequest,
  UpdateTrackDetailsRequest,
  UploadTrackResponse,
  TrackResponse,
  GetTracksResponse,
  DeleteTrackResponse,
  PermissionsResponse,
  UploadTrackData,
  ResendVerificationRequest,
  ResendVerificationResponse,
  VerifyEmailChangeRequest,
  VerifyEmailChangeResponse,
  ResendCodeResponse,
  CancelChangeResponse,
  GetPendingResponse,
} from '@/helper/type';

// ==================== AUTH ENDPOINTS ====================

export const register = async (data: TRegistrationSchema) => {
  const response = await api.post('/api/auth/register', data);
  return response.data;
};

export const refreshToken = async () => {
  const response = await api.post('/api/auth/refresh');
  return response.data;
};

export const resendVerificationCode = async (
  data: ResendVerificationRequest
): Promise<ResendVerificationResponse> => {
  const response = await api.post('/api/auth/resend-verification', data);
  return response.data;
};

export const verifyEmail = async (data: EmailVerification) => {
  const response = await api.post('/api/auth/verify-email', data);
  return response.data;
};

export const login = async (data: TLoginSchema) => {
  const {
    data: { user },
  } = await api.post('/api/auth/login', data);
  return user;
};

export const logoutApi = async () => {
  const {
    data: { message },
  } = await api.post('/api/auth/logout');
  return message;
};

export const getCurrentUser = async () => {
  const {
    data: { user },
  } = await api.get('/api/user/get-user');
  return user;
};
export const ArtistOnboarding = async (data: TOnboardingSchema) => {
  const { data: artist } = await api.post('/api/artist/onboard', data);
  return artist;
};

export const getArtistProfile = async () => {
  const { data: artistProfile } = await api.get('/api/artist/profile');
  return artistProfile;
};

export const updateArtistProfile = async (data: UpdateArtistRequest) => {
  const response = await api.patch('/api/artist/profile', data);
  return response.data;
};
export const getProfileCompletionStatus = async () => {
  const response = await api.get('/api/artist/profile/completion');
  return response.data;
};

export const uploadProfileImage = async (
  data: ProfilePictureRequest
): Promise<ProfilePictureResponse> => {
  const formData = new FormData();
  formData.append('profilepic', data.file);

  const response = await api.patch('/api/artist/profile/picture', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const updateUserUsername = async (
  userData: UpdateUserRequest
): Promise<UpdateUserResponse> => {


  const response = await api.put('/api/user/update-username', userData);
  return response.data;
};

export const requestEmailChange = async (
  Data: EmailChangeRequest
): Promise<EmailChangeResponse> => {


  const response = await api.put(
    '/api/user/request-email-change',
    Data
  );
  return response.data;
};

export const verifyEmailChange = async (
  verificationData: VerifyEmailChangeRequest
): Promise<VerifyEmailChangeResponse> => {
  const response = await api.put(
    '/api/user/verify-email-change',
    verificationData
  );
  return response.data;
};

// For Email Change
export const resendVerification =
  async (): Promise<ResendCodeResponse> => {
    const response = await api.post('/api/user/resend-verification');
    return response.data;
  };

export const getPendingEmailChange = async (): Promise<GetPendingResponse> =>{
const response = await api.get('/api/user/pending-email-change')
return response.data
} 

export const cancelEmailChange = async (): Promise<CancelChangeResponse> => {
  const response = await api.delete('/api/user/cancel-email-change');
  return response.data;
};

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
): Promise<{ status: 'success'; data: TrackResponse }> => {
  const response = await api.get(`/api/artist/tracks/${trackId}`);
  return response.data;
};

/**
 * Update track details
 */
export const updateTrackDetails = async (
  data: UpdateTrackDetailsRequest
): Promise<{ status: 'success'; message: string; track: TrackResponse }> => {
  const { id, thumbnail, ...updateData } = data;

  // If thumbnail is provided, use FormData
  if (thumbnail) {
    const formData = new FormData();
    if (updateData.title) formData.append('title', updateData.title);
    if (updateData.description)
      formData.append('description', updateData.description);
    if (updateData.genre) formData.append('genre', updateData.genre);
    formData.append('thumbnail', thumbnail);

    const response = await api.patch(
      `/api/artists/tracks/${id}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  }

  // Otherwise, send JSON
  const response = await api.patch(
    `/api/artist/tracks/${id}`,
    updateData
  );
  return response.data;
};

/**
 * Delete a track
 */
export const deleteTrack = async (
  trackId: string
): Promise<DeleteTrackResponse> => {
  const response = await api.delete<DeleteTrackResponse>(
    `/api/artists/tracks/${trackId}`
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

 export const verifyArtist = async () => {};
// ;
