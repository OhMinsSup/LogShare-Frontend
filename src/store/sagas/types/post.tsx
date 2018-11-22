import { PostDataState, PostSequenceState } from 'src/store/modules/post';

export type ReadPostPayload = {
  payload: {
    postId: string;
  };
};
export type LikePayload = {
  payload: {
    postId: string;
  };
};
export type DeletePostPayload = {
  payload: {
    postId: string;
  };
};
export type PostSequencesPayload = {
  payload: {
    postId: string;
  };
};
export type LikeResponse = {
  data: {
    liked: boolean;
    likes: number;
  };
};
export type ReadPostResponse = {
  data: PostDataState | null;
};
export type PostSequencesResponse = {
  data: PostSequenceState[];
};
