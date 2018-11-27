import axios from 'axios';

export const listPosts = (username?: string) => {
  if (username) return axios.get(`/post/list/@${username}`);
  return axios.get('/post/list/public');
};
export const next = (next: string) => axios.get(next);
export const terendingPosts = () => axios.get('/post/list/trending');
