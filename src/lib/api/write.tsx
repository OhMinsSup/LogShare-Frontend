import axios from 'axios';

type WritePostPayload = {
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
