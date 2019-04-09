import axios from '../defaultClient';
import * as qs from 'query-string';

export interface SearchParams {
  q: string;
  username?: string;
  page?: number;
}

export const search = ({ q, username, page }: SearchParams) => {
  const query = qs.stringify({ q, username, page });
  return axios.get(`/search?${query}`);
};
