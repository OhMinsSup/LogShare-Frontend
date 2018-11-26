import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import * as PostType from './types/post';

export enum PostActionType {
  SET_MODAL = 'post/SET_MODAL',

  READ_POST_REQUEST = 'post/READ_POST_REQUEST',
  READ_POST_SUCCESS = 'post/READ_POST_SUCCESS',

  LIKE = 'post/Like',
  LIKE_REQUEST = 'post/LIKE_REQUEST',
  LIKE_SUCCESS = 'post/LIKE_SUCCESS',
  LIKE_ERROR = 'post/LIKE_ERROR',

  UNLIKE = 'post/UNLIKE',
  UNLIKE_REQUEST = 'post/UNLIKE_REQUEST',
  UNLIKE_SUCCESS = 'post/UNLIKE_SUCCESS',
  UNLIKE_ERROR = 'post/UNLIKE_ERROR',

  POST_SEQUENCES_REQUEST = 'post/POST_SEQUENCES_REQUEST',
  POST_SEQUENCES_SUCCESS = 'post/POST_SEQUENCES_SUCCESS',

  DELETE_POST = 'post/DELETE_POST',

  WRITE_COMMENT_REQUEST = 'post/WRITE_COMMENT_REQUEST',
  WRITE_COMMENT_SUCCESS = 'post/WRITE_COMMENT_SUCCESS',

  READ_COMMENTS_REQUEST = 'post/READ_COMMENTS_REQUEST',
  READ_COMMENTS_SUCCESS = 'post/READ_COMMENTS_SUCCESS',

  READ_SUBCOMMENTS_REQUEST = 'post/READ_SUBCOMMENTS_REQUEST',
  READ_SUBCOMMENTS_SUCCESS = 'post/READ_SUBCOMMENTS_SUCCESS',

  EDIT_COMMENT_REQUEST = 'post/EDIT_COMMENT_REQUEST',
  EDIT_COMMENT_SUCCESS = 'post/EDIT_COMMENT_SUCCESS',

  DELETE_COMMENT_REQUEST = 'post/DELETE_COMMENT_REQUEST',
  DELETE_COMMENT_SUCCESS = 'post/DELETE_COMMENT_SUCCESS',

  CANCEL_COMMENT_REMOVE = 'post/CANCEL_COMMENT_REMOVE',
  OPEN_COMMENT_REMOVE = 'post/OPEN_COMMENT_REMOVE',
}

export const postCreators = {
  setModal: createAction(
    PostActionType.SET_MODAL,
    (visible: boolean) => visible
  ),
  readPost: createAction(
    PostActionType.READ_POST_REQUEST,
    (payload: PostType.ReadPostPayload) => payload
  ),
  like: createAction(
    PostActionType.LIKE,
    (payload: PostType.LikePayload) => payload
  ),
  unlike: createAction(
    PostActionType.UNLIKE,
    (payload: PostType.LikePayload) => payload
  ),
  postSequences: createAction(
    PostActionType.POST_SEQUENCES_REQUEST,
    (payload: PostType.PostSequencesPayload) => payload
  ),
  deletePost: createAction(
    PostActionType.DELETE_POST,
    (payload: PostType.DeletePostPayload) => payload
  ),
  writeComment: createAction(
    PostActionType.WRITE_COMMENT_REQUEST,
    (payload: PostType.WriteCommentPayload) => payload
  ),
  editComment: createAction(
    PostActionType.EDIT_COMMENT_REQUEST,
    (payload: PostType.EditCommentPayload) => payload
  ),
  deleteComment: createAction(
    PostActionType.DELETE_COMMENT_REQUEST,
    (payload: PostType.DeleteCommentPayload) => payload
  ),
  readComments: createAction(
    PostActionType.READ_COMMENTS_REQUEST,
    (payload: PostType.ReadCommentPayload) => payload
  ),
  readSubcomments: createAction(
    PostActionType.READ_SUBCOMMENTS_REQUEST,
    (payload: PostType.ReadSubCommentPayload) => payload
  ),
  openCommentRemove: createAction(
    PostActionType.OPEN_COMMENT_REMOVE,
    (payload: PostType.OpenCommentRemovePayload) => payload
  ),
  cancelCommentRemove: createAction(PostActionType.CANCEL_COMMENT_REMOVE),
};

export interface PostDataState {
  postId: string;
  post_thumbnail: string | null;
  title: string;
  body: string;
  liked: boolean;
  createdAt: string;
  tag: string[];
  info: {
    likes: number;
    comments: number;
  };
  user: {
    username: string;
    thumbnail: string;
    shortBio: string;
    _id: string;
  };
}

export interface CommentDataState {
  post: string;
  _id: string;
  user: {
    profile: {
      username: string;
      thumbnail: string;
      shortBio: string;
    };
    _id: string;
  };
  reply: string;
  level: number;
  visible: boolean;
  text: string;
  createdAt: string;
}

export interface PostSequenceState {
  _id: string;
  post_thumbnail: string | null;
  title: string;
  body: string;
  createdAt: string;
}

export interface RemoveCommentState {
  visible: boolean;
  commentId: string | null;
  reply: string | null;
}

export interface SubCommentState {
  ['']: CommentDataState[];
}

export interface PostState {
  postData: PostDataState | null;
  sequences: PostSequenceState[] | null;
  comments: CommentDataState[] | null;
  removeComment: RemoveCommentState;
  subComment: SubCommentState | {};
  askModal: boolean;
  askComment: boolean;
}

const initialState: PostState = {
  postData: null,
  sequences: [],
  askModal: false,
  askComment: false,
  comments: null,
  subComment: {},
  removeComment: {
    commentId: null,
    reply: null,
    visible: false,
  },
};

export default handleActions<PostState, any>(
  {
    [PostActionType.OPEN_COMMENT_REMOVE]: (
      state,
      action: PostType.OpenCommentRemoveAction
    ) => {
      return produce(state, draft => {
        if (action.payload === undefined) return;
        const {
          payload: { commentId, reply },
        } = action;
        draft.removeComment = {
          commentId,
          reply,
          visible: true,
        };
      });
    },
    [PostActionType.CANCEL_COMMENT_REMOVE]: state => {
      return produce(state, draft => {
        draft.removeComment = {
          commentId: null,
          reply: null,
          visible: false,
        };
      });
    },
    [PostActionType.SET_MODAL]: (state, action: PostType.SetModalAction) => {
      return produce(state, draft => {
        if (action.payload === undefined) return;
        draft.askModal = action.payload;
      });
    },
    [PostActionType.READ_POST_SUCCESS]: (
      state,
      action: PostType.ReadPostAction
    ) => {
      return produce(state, draft => {
        if (action.payload === undefined) return;
        draft.postData = action.payload.postData;
      });
    },
    [PostActionType.LIKE_REQUEST]: state => {
      return produce(state, draft => {
        if (!draft.postData) return;
        draft.postData.liked = true;
        draft.postData.info.likes += 1;
      });
    },
    [PostActionType.LIKE_ERROR]: state => {
      return produce(state, draft => {
        if (!draft.postData) return;
        draft.postData.liked = false;
        draft.postData.info.likes -= 1;
      });
    },
    [PostActionType.LIKE_SUCCESS]: (state, action: PostType.LikeAction) => {
      return produce(state, draft => {
        if (action.payload === undefined || !draft.postData) return;
        const {
          payload: { liked, likes },
        } = action;
        (draft.postData.liked = liked), (draft.postData.info.likes = likes);
      });
    },
    [PostActionType.UNLIKE_REQUEST]: state => {
      return produce(state, draft => {
        if (!draft.postData) return;
        draft.postData.liked = false;
        draft.postData.info.likes -= 1;
      });
    },
    [PostActionType.UNLIKE_ERROR]: state => {
      return produce(state, draft => {
        if (!draft.postData) return;
        draft.postData.liked = true;
        draft.postData.info.likes += 1;
      });
    },
    [PostActionType.UNLIKE_SUCCESS]: (state, action: PostType.LikeAction) => {
      return produce(state, draft => {
        if (action.payload === undefined || !draft.postData) return;
        const {
          payload: { liked, likes },
        } = action;
        (draft.postData.liked = liked), (draft.postData.info.likes = likes);
      });
    },
    [PostActionType.POST_SEQUENCES_SUCCESS]: (
      state,
      action: PostType.PostSequencesAction
    ) => {
      return produce(state, draft => {
        if (action.payload === undefined) return;
        draft.sequences = action.payload.sequences;
      });
    },
    [PostActionType.WRITE_COMMENT_SUCCESS]: (
      state,
      action: PostType.WriteCommentAction
    ) => {
      return produce(state, draft => {
        if (action.payload === undefined) return;
        draft.askComment = action.payload.status;
      });
    },
    [PostActionType.READ_COMMENTS_SUCCESS]: (
      state,
      action: PostType.ReadCommentsAction
    ) => {
      return produce(state, draft => {
        if (action.payload === undefined) return;
        const {
          payload: { comments },
        } = action;
        draft.comments = comments;
      });
    },
    [PostActionType.READ_SUBCOMMENTS_SUCCESS]: (state, action) => {
      return produce(state, draft => {
        if (action.payload === undefined) return;
        const {
          payload: { commentId, subComments, parentId },
        } = action;

        if (!draft.comments) return;
        let comment = null;

        if (!parentId) {
          comment = draft.comments.find(c => c._id === commentId);
        } else {
          if (!draft.subComment[parentId]) return;
          comment = draft.subComment[parentId].find(
            (c: any) => c._id === commentId
          );
        }
        if (!comment) return;
        draft.subComment[commentId] = subComments;
      });
    },
    [PostActionType.DELETE_COMMENT_SUCCESS]: state => {
      return produce(state, draft => {
        draft.removeComment = {
          commentId: null,
          reply: null,
          visible: false,
        };
      });
    },
    [PostActionType.EDIT_COMMENT_SUCCESS]: (state, action) => {
      return produce(state, draft => {
        if (action.payload === undefined) return;
        draft.askComment = action.payload.status;
      });
    },
  },
  initialState
);
