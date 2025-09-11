import axios from 'axios';
import { TRegistrationSchema, TLoginSchema, TOnboardingSchema } from './validators/auth';

export const api = axios.create({
  baseURL: '/', 
  withCredentials: true,
});

export const register = async (data: TRegistrationSchema) => {
  const { data: { user } } = await api.post('/api/auth/register', data);
  return  user ;
};

export const login = async (data: TLoginSchema) => {
  const { data: { user} } = await api.post('/api/auth/login', data);
  return  user ;
};

export const logoutApi = async () => {
  const { data: { message } } = await api.post('/api/auth/logout');
  return  message ;
};

export const getCurrentUser = async () => {
  const { data: { user } } = await api.get('/api/user/get-user');
  return user;
};
export const ArtistOnboarding = async(data:TOnboardingSchema) => {
const {
  data: { NewArtist },
} = await api.post('/api/artist/onboarding', data);
return NewArtist;
}

export const verifyArtist = async() => {

}

// export const getMe = async () => {
//   const { data: { user } } = await api.get('/api/user/get-me');
//   return user;
// };
