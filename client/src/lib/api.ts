import axios from 'axios';
import {
  TRegistrationSchema,
  TLoginSchema,
  TOnboardingSchema,
} from './validators/auth';
export const api = axios.create({
  baseURL: '/',
  withCredentials: true,
});
import {
  ProfilePictureResponse,
  ProfilePictureRequest,
  UpdateUserRequest,
  ResendVerificationRequest,
  ResendVerificationResponse ,
  EmailChangeRequest,
  EmailVerificationRequest,
  UpdateUserResponse,
  EmailChangeResponse,
  MessageResponse,
  UpdateArtistRequest,
  EmailVerification,
} from '@/helper/type';
import {
  UpdateUserSchema,
  RequestEmailChangeSchema,
  VerifyEmailChangeSchema,
} from './validators/user';

// lib/api.ts
export const register = async (data: TRegistrationSchema) => {
  const response = await api.post('/api/auth/register', data);
  return response.data; 
};
export const resendVerificationCode = async (data: ResendVerificationRequest): Promise<ResendVerificationResponse> => {
  const response = await api.post('/api/auth/resend-verification', data);
  return response.data;
};

export const verifyEmail = async(data:EmailVerification) => {
  const response = await api.post('/api/auth/verify-email', data)
  return response.data
}
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
  const { data: artist } = await api.post('/api/artist/onboarding', data);
  return artist;
};

export const getArtistProfile = async () => {
  const { data: artistProfile } = await api.get('/api/artist/profile');
  return artistProfile;
};

export const updateArtistProfile = async (data: UpdateArtistRequest) => {
  const response = await api.put('/api/artist/update-profile', data);
  return response.data;
};
export const getProfileCompletionStatus = async () => {
  const response = await api.get('/api/artist/profile-completion-status');
  return response.data;
};

export const uploadProfileImage = async (
  data: ProfilePictureRequest
): Promise<ProfilePictureResponse> => {
  const formData = new FormData();
  formData.append('profilepic', data.file);

  const response = await api.post('/api/artist/profile-pic', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const deleteProfileImage = async () => {
  const {
    data: { profilepic },
  } = await api.delete('/api/delete-profile-pic');
  return profilepic;
};
export const updateUserProfile = async (
  userData: UpdateUserRequest
): Promise<UpdateUserResponse> => {
  const validatedData = UpdateUserSchema.parse(userData);

  const response = await api.put('/api/user/update-user', validatedData);
  return response.data;
};

export const requestEmailChange = async (
  emailData: EmailChangeRequest
): Promise<EmailChangeResponse> => {
  const validatedData = RequestEmailChangeSchema.parse(emailData);

  const response = await api.post(
    '/api/user/request-email-change',
    validatedData
  );
  return response.data;
};

export const verifyEmailChange = async (
  verificationData: EmailVerificationRequest
): Promise<UpdateUserResponse> => {
  const validatedData = VerifyEmailChangeSchema.parse(verificationData);

  const response = await api.post(
    '/api/user/verify-email-change',
    validatedData
  );
  return response.data;
};

// export const resendVerificationCode = async (): Promise<MessageResponse> => {
//   const response = await api.post('/api/user/resend-verification');
//   return response.data;
// };

export const cancelEmailChange = async (): Promise<MessageResponse> => {
  const response = await api.delete('/api/user/cancel-email-change');
  return response.data;
};

export const safeParseUserUpdate = (data: unknown) => {
  return UpdateUserSchema.safeParse(data);
};

export const safeParseEmailChange = (data: unknown) => {
  return RequestEmailChangeSchema.safeParse(data);
};

export const safeParseVerification = (data: unknown) => {
  return VerifyEmailChangeSchema.safeParse(data);
};
export const verifyArtist = async () => {};

// export const getMe = async () => {
//   const { data: { user } } = await api.get('/api/user/get-me');
//   return user;
// };
