import axios from 'axios';

type CheckExistsPayload = { key: string; value: string };
type LocalLoginPayload = { email: string; password: string };
type LocalRegisterPayload = {
  username: string;
  email: string;
  password: string;
};
type VerifySocialPayload = { provider: string; accessToken: string };
type SocialLoginPayload = { provider: string; accessToken: string };
type SocialRegisterPayload = {
  provider: string;
  accessToken: string;
  username: string;
};

export const checkExists = ({ key, value }: CheckExistsPayload) =>
  axios.get(`/auth/exists/${key}/${value}`);

export const localRegister = ({
  username,
  email,
  password,
}: LocalRegisterPayload) =>
  axios.post('/auth/register/local', {
    username,
    email,
    password,
  });

export const localLogin = ({ email, password }: LocalLoginPayload) =>
  axios.post('/auth/login/local', { email, password });

export const logout = () => axios.post('/auth/logout');
export const getProviderToken = () => axios.post('/auth/callback/token');
export const verifySocial = ({ provider, accessToken }: VerifySocialPayload) =>
  axios.post(`/auth/verify-social/${provider}`, { accessToken });
export const socialLogin = ({ provider, accessToken }: SocialLoginPayload) =>
  axios.post(`/auth/login/${provider}`, { accessToken });
export const socialRegister = ({
  accessToken,
  username,
  provider,
}: SocialRegisterPayload) =>
  axios.post(`/auth/register/${provider}`, { accessToken, username });
