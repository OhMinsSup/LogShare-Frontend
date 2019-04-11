import axios from '../defaultClient';

export const feedPosts = () => axios.get('/feed/post/private');
export const feedUsers = () => axios.get('/feed/user/private');
