import { History } from 'history';

export type CreateUploadUrlPostPayload = {
  payload: {
    file: File;
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
