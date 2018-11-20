import axios from 'axios';

export const readPost = (postId: string) => axios.get(`/post/${postId}`);
