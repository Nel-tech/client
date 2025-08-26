import axios from 'axios';
import { TRegistrationSchema, TLoginSchema } from './validators/auth';
const url = process.env.NEXT_PUBLIC_API_URL;

export const api = axios.create({
  baseURL: url,
  withCredentials: true,
});

export const register = async (data: TRegistrationSchema) => {
  const response = await api.post('/api/auth/register', data);
  return response.data;
};

export const login = async (data: TLoginSchema) => {
  const response = await api.post(`/api/auth/login`, data);
  return response.data;
};
