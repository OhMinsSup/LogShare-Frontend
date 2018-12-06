import axios from 'axios';

export const listPosts = (username?: string) => {
  if (username) return axios.get(`/post/list/@${username}`);
  return axios.get('/post/list/public');
};
export const next = (next: string) => axios.get(next);
export const terendingPosts = () => axios.get('/post/list/trending');
export const likePosts = (username: string) =>
  axios.get(`/post/list/likes/@${username}`);

export const followingUsers = (username: string) =>
  axios.get(`/common/follow/@${username}/following`);
export const followerUsers = (username: string) =>
  axios.get(`/common/follow/@${username}/follower`);

export const listUsers = () => axios.get('/common/user');
export const noticesMessage = () => axios.get('/common/notice/');