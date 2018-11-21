import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import * as PostType from './types/post';

export enum PostActionType {
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
}

export const postCreators = {
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

export interface PostState {
  postData: PostDataState | null;
}

const initialState: PostState = {
  postData: null,
};

export default handleActions<PostState, any>(
  {
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
  },
  initialState
);
