import axios from '../defaultClient';

export const createUrlPost = (file: File) => {
  const data = new FormData();
  data.append('image', file);
  return axios.post('/file/create-url/post-images', data, {
    headers: {
      'Content-Type': file.type,
    },
    withCredentials: true,
  });
};
export const createUrlUser = (file: File) => {
  const data = new FormData();
  data.append('thumbnail', file);
  return axios.post('/file/create-url/thumbnail', data, {
    headers: {
      'Content-Type': file.type,
    },
    withCredentials: true,
  });
};
export const createUrlCover = (file: File) => {
  const data = new FormData();
  data.append('cover', file);
  return axios.post('/file/create-url/cover', data, {
    headers: {
      'Content-Type': file.type,
    },
    withCredentials: true,
  });
};
