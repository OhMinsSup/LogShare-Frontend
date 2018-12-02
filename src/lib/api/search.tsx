import axios from 'axios';

export const searchPost = (value: string) =>
  axios.get(`/common/search/post/${value}`);
export const searchUser = (value: string) =>
  axios.get(`/common/search/user/${value}`);
