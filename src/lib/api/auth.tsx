import axios from 'axios';

type CheckExistsPayload = { key: string; value: string };

export const checkExists = ({ key, value }: CheckExistsPayload) =>
  axios.get(`/auth/exists/${key}/${value}`);
