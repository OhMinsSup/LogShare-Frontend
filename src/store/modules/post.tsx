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

export interface PostSequenceState {
  _id: string;
  post_thumbnail: string | null;
  title: string;
  body: string;
  createdAt: string;
}

export interface PostState {
  postData: PostDataState | null;
  sequences: PostSequenceState[] | null;
  askModal: boolean;
}

const initialState: PostState = {
  postData: null,
  sequences: [],
  askModal: false,
};

export default handleActions<PostState, any>(
  {
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
  },
  initialState
);
