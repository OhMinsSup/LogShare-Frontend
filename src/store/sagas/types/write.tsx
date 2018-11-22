import { History } from 'history';
import { PostDataState } from 'src/store/modules/post';

export type CreateUploadUrlPostPayload = {
  payload: {
    file: File;
  };
};
export type GetPostPayload = {
  payload: {
    postId: string;
  };
};
export type WriteSubmitPayload = {
  payload: {
    title: string;
    body: string;
    post_thumbnail: string | null;
    tags: string[];
    history: History;
  };
};
export type EditSubmitPayload = {
  payload: {
    postId: string;
    title: string;
    body: string;
    post_thumbnail: string | null;
    tags: string[];
    history: History;
  };
};
export type CreateUploadUrlPostResponse = {
  data: {
    url: string;
    path: string;
    name: string;
  };
};
export type WriteSubmitResponse = {
  data: {
    postId: string;
  };
};
export type GetPostAction = {
  data: PostDataState | null;
};
