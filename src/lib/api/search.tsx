import axios from '../defaultClient';

export const searchPost = (value: string) => axios.get(`/search/post/${value}`);
export const searchUser = (value: string) => axios.get(`/search/user/${value}`);
