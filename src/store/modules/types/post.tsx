import {
  PostDataState,
  PostSequenceState,
  postCreators,
  CommentDataState,
} from '../post';
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
export type DeletePostPayload = {
  postId: string;
};
export type WriteCommentPayload = {
  postId: string;
  text: string;
  reply: string | null;
};
export type OpenCommentRemovePayload = {
  commentId: string | null;
  reply: string | null;
};
export type EditCommentPayload = {
  postId: string;
  commentId: string;
  text: string;
};
export type DeleteCommentPayload = {
  postId: string;
  commentId: string;
};
export type ReadCommentPayload = {
  postId: string;
};
export type ReadSubCommentPayload = {
  postId: string;
  commentId: string;
  parentId: string | null;
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
export type SetModalAction = ReturnType<typeof postCreators.setModal>;
export type WriteCommentAction = GenericResponseAction<
  { status: boolean },
  string
>;
export type OpenCommentRemoveAction = ReturnType<
  typeof postCreators.openCommentRemove
>;
export type ReadCommentsAction = GenericResponseAction<
  { comments: CommentDataState[] },
  string
>;
