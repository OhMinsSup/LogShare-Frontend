import { PostDataState } from 'src/store/modules/post';

export type ReadPostPayload = {
  payload: {
    postId: string;
  };
};
export type ReadPostResponse = {
  data: PostDataState | null;
};
