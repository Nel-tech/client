import { api } from '../../index';
import { FOnboardingSchema } from '../../../validators/auth';

import { UpdateFanRequest, ProfilePictureRequest, ProfilePictureResponse } from '@/lib/api/endpoints/fan/type';

export const FanOnboarding = async (data: FOnboardingSchema) => {
  const response = await api.post('/api/fan/onboard', data);
  return response.data;
};

export const getFanProfile = async () => {
  const response = await api.get('/api/fan/profile');
  return response.data;
};

export const updateFanProfile = async (data: UpdateFanRequest) => {
  const response = await api.patch('/api/fan/update-profile', data);
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