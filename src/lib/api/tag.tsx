import axios from 'axios';

export const getTag = () => axios.get('/common/tags/');
export const getTagInfo = (tag: string) => axios.get(`/common/tags/${tag}`);
export const next = (next: string) => axios.get(next);
