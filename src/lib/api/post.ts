import axios from '../defaultClient';
import * as queryString from 'query-string';

export const readPost = (postId: string) => axios.get(`/post/${postId}`);
export const deletePost = (postId: string) => axios.delete(`/post/${postId}`);
export const updatePost = (postId: string) => axios.put(`/post/${postId}`);
export const like = (postId: string) => axios.post(`/post/${postId}/like/`);
export const unlike = (postId: string) => axios.delete(`/post/${postId}/like/`);
export const sequences = (postId: string) => {
  const query = queryString.stringify({
    postId,
  });
  return axios.get(`/post/list/sequences?${query}`);
};
