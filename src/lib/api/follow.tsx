import axios from 'axios';

export const follow = (username: string) =>
  axios.post(`/common/follow/@${username}`);

export const unfollow = (username: string) =>
  axios.delete(`/common/follow/@${username}`);

export const getFollow = (username: string) =>
  axios.get(`/common/follow/@${username}`);
