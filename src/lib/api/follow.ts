import axios from '../defaultClient';

export const follow = (username: string) => axios.post(`/follow/@${username}`);

export const unfollow = (username: string) =>
  axios.delete(`/follow/@${username}`);

export const getFollow = (username: string) =>
  axios.get(`/follow/@${username}`);
