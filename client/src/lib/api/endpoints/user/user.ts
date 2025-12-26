import { api } from '../../index';
import { TRegistrationSchema, TLoginSchema } from '../../../validators/auth';
import { StandardResponse } from './type';
import { ResendVerificationRequest, UpdateUserRequest,GetPendingResponse,  UpdateUserResponse, ResendVerificationResponse, EmailVerification, EmailChangeRequest, EmailChangeResponse, VerifyEmailChangeRequest,VerifyEmailChangeResponse } from './type';

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

export const updateUserUsername = async (
  userData: UpdateUserRequest
): Promise<UpdateUserResponse> => {
  const response = await api.put('/api/user/update-username', userData);
  return response.data;
};

export const requestEmailChange = async (
  Data: EmailChangeRequest
): Promise<EmailChangeResponse> => {
  const response = await api.put('/api/user/request-email-change', Data);
  return response.data;
};

export const verifyEmailChange = async (
  token: string 
): Promise<VerifyEmailChangeResponse> => {
  const response = await api.post(
    '/api/user/verify-email-change',
    { token: token } 
  );
  return response.data;
};

// For Email Change
export const resendVerification =
  async (): Promise<ResendVerificationResponse> => {
    const response = await api.post('/api/user/resend-verification');
    return response.data;
  };

export const getPendingEmailChange = async (): Promise<GetPendingResponse> => {
  const response = await api.get('/api/user/pending-email-change');
  console.log('Response',response.data)
  return response.data;
};

export const cancelEmailChange = async (): Promise<StandardResponse> => {
  const response = await api.delete('/api/user/cancel-email-change');
  return response.data;
};


