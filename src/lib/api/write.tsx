import axios from 'axios';

type WritePostPayload = {
  title: string;
  body: string;
  post_thumbnail: string | null;
  tags: string[];
};

type UpdatePostPayload = {
  postId: string;
  title: string;
  body: string;
  post_thumbnail: string | null;
  tags: string[];
};

export const writePost = ({
  title,
  body,
  post_thumbnail,
  tags,
}: WritePostPayload) =>
  axios.post('/post', { title, body, post_thumbnail, tags });
export const getPost = (postId: string) => axios.get(`/post/${postId}`);
export const updatePost = ({
  postId,
  title,
  body,
  post_thumbnail,
  tags,
}: UpdatePostPayload) =>
  axios.put(`/post/${postId}`, {
    title,
    body,
    post_thumbnail,
    tags,
  });
