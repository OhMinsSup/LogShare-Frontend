import axios from 'axios';
import { ICustomWindow } from '../common';

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

export const createVideoUpload = (file: File) => {
  const data = new FormData();
  data.append('video', file);
  return axios.post('/file/create-url/video-upload', data, {
    headers: {
      'Content-Type': file.type,
    },
    withCredentials: false,
    onUploadProgress: (e: ProgressEvent) => {
      (window as ICustomWindow).progress = Math.round(
        (e.loaded * 100) / e.total
      );
    },
  });
};

export const createVideoThumbnail = (file: File) => {
  const data = new FormData();
  data.append('image', file);
  return axios.post('/file/create-url/video-thumbnail', data, {
    headers: {
      'Content-Type': file.type,
    },
    withCredentials: false,
    onUploadProgress: (e: ProgressEvent) => {
      (window as ICustomWindow).progress = Math.round(
        (e.loaded * 100) / e.total
      );
    },
  });
};
