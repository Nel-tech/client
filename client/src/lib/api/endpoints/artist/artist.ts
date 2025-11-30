import { api } from '../../index';
import { TOnboardingSchema } from '../../../validators/auth';
import { UpdateArtistRequest } from './type';
import { ProfilePictureRequest, ProfilePictureResponse } from './type';
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

  const response = await api.patch(
    '/api/artist/profile/update-profilePic',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  return response.data;
};