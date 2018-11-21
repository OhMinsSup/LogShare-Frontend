import axios from 'axios';

export const readPost = (postId: string) => axios.get(`/post/${postId}`);
export const like = (postId: string) => axios.post(`/post/${postId}/like/`);
export const unlike = (postId: string) => axios.delete(`/post/${postId}/like/`);
