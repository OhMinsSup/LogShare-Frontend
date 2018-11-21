import { PostDataState, PostSequenceState } from '../post';
import { GenericResponseAction } from 'src/lib/common';

export type ReadPostPayload = {
  postId: string;
};
export type LikePayload = {
  postId: string;
};
export type PostSequencesPayload = {
  postId: string;
};
export type ReadPostAction = GenericResponseAction<
  {
    postData: PostDataState | null;
  },
  string
>;
export type LikeAction = GenericResponseAction<
  {
    liked: boolean;
    likes: number;
  },
  string
>;
export type PostSequencesAction = GenericResponseAction<
  {
    sequences: PostSequenceState[];
  },
  string
>;
