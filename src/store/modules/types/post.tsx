import { PostDataState, PostSequenceState, CommentDataState } from '../post';
import { GenericResponseAction } from 'src/lib/common';

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
export type WriteCommentAction = GenericResponseAction<
  { status: boolean },
  string
>;
export type ReadCommentsAction = GenericResponseAction<
  { comments: CommentDataState[] },
  string
>;
export type ReadSubCommentsAction = GenericResponseAction<
  {
    commentId: string;
    subComments: CommentDataState[];
    parentId: string;
  },
  string
>;
export type EditCommentAction = GenericResponseAction<
  {
    status: boolean;
  },
  string
>;
