import axios from 'axios';

export const getUserInfo = (username: string) =>
  axios.get(`/common/user/info/@${username}`);
