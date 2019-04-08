import axios from 'axios';

axios.defaults.withCredentials = true;

const baseURL = (() => {
  if (process.env.NODE_ENV === 'development') return 'http://localhost:4000/';
  return 'https://logshare-backend.herokuapp.com';
})();

const defaultClient = axios.create({
  baseURL,
  withCredentials: true,
});

export default defaultClient;
