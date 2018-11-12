import axios from 'axios';

type CheckExistsPayload = { key: string; value: string };
type LocalLoginPayload = { email: string; password: string };
type LocalRegisterPayload = {
  username: string;
  email: string;
  password: string;
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
