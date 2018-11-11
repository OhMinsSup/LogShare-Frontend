import axios from 'axios';

type CheckExistsPayload = { key: string; value: string };
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
