import axios from '../defaultClient';

export const getTagInfo = (tag: string) => axios.get(`/tag/${tag}`);
export const next = (next: string) => axios.get(next);
