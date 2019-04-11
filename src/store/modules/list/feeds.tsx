import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { GenericResponseAction } from 'src/lib/common';

export enum FeedsActionType {
  GET_FEEDS_POST_LIST_REQUEST = 'list/feeds/GET_FEEDS_POST_LIST_REQUEST',
  GET_FEEDS_POST_LIST_SUCCESS = 'list/feeds/GET_FEEDS_POST_LIST_SUCCESS',

  GET_FEEDS_USER_LIST_REQUEST = 'list/feeds/GET_FEEDS_USER_LIST_REQUEST',
  GET_FEEDS_USER_LIST_SUCCESS = 'list/feeds/GET_FEEDS_USER_LIST_SUCCESS',
}

export const feedsCreators = {
  getFeedsPost: createAction(FeedsActionType.GET_FEEDS_POST_LIST_REQUEST),
  getFeedsUser: createAction(FeedsActionType.GET_FEEDS_USER_LIST_REQUEST),
};

type GetFeedsPostAction = GenericResponseAction<
  {
    posts: FeedsPostData[];
  },
  string
>;
type GetFeedsUserAction = GenericResponseAction<
  {
    users: FeedsUserData[];
  },
  string
>;

export interface FeedsPostData {
  postId: string;
  userId: string;
  title: string;
  post_thumbnail: string;
  tags: string[];
  info: {
    likes: number;
    comments: number;
  };
}

export interface FeedsUserData {
  userId: string;
  profile: {
    username: string;
    thumbnail: string;
    cover: string;
    shortBio: string;
  };
}

export interface FeedsState {
  posts: FeedsPostData[];
  users: FeedsUserData[];
}

const initialState: FeedsState = {
  posts: [],
  users: [],
};

export default handleActions<FeedsState, any>(
  {
    [FeedsActionType.GET_FEEDS_POST_LIST_SUCCESS]: (
      state,
      action: GetFeedsPostAction
    ) => {
      return produce(state, draft => {
        draft.posts = action.payload.posts;
      });
    },
    [FeedsActionType.GET_FEEDS_USER_LIST_SUCCESS]: (
      state,
      action: GetFeedsUserAction
    ) => {
      return produce(state, draft => {
        draft.users = action.payload.users;
      });
    },
  },
  initialState
);
