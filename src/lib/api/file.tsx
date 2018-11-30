import axios from 'axios';

export const createUrlPost = (file: File) => {
  const data = new FormData();
  data.append('image', file);
  return axios.post('/file/create-url/post-images', data, {
    headers: {
      'Content-Type': file.type,
    },
    withCredentials: false,
  });
};
export const createUrlUser = (file: File) => {
  const data = new FormData();
  data.append('thumbnail', file);
  return axios.post('/file/create-url/common-thumbnail', data, {
    headers: {
      'Content-Type': file.type,
    },
    withCredentials: false,
  });
};
export const createUrlCover = (file: File) => {
  const data = new FormData();
  data.append('cover', file);
  return axios.post('/file/create-url/common-cover-background', data, {
    headers: {
      'Content-Type': file.type,
    },
    withCredentials: false,
  });
};
