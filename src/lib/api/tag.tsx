import axios from '../defaultClient';

export const getTag = () => axios.get('/tags/');
export const getTagInfo = (tag: string) => axios.get(`/tags/${tag}`);
export const next = (next: string) => axios.get(next);
