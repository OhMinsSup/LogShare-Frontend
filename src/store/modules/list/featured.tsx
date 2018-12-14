import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import * as ListType from '../types/list';

export enum FeaturedActionType {
  GET_FEATURED_POSTS_LIST_REQUEST = 'list/featured/GET_FEATURED_POSTS_LIST_REQUEST',
  GET_FEATURED_POSTS_LIST_PENDING = 'list/featured/GET_FEATURED_POSTS_LIST_PENDING',
  GET_FEATURED_POSTS_LIST_SUCCESS = 'list/featured/GET_FEATURED_POSTS_LIST_SUCCESS',

  GET_FEATURED_USERS_LIST_REQUEST = 'list/featured/GET_FEATURED_USERS_LIST_REQUEST',
  GET_FEATURED_USERS_LIST_PENDING = 'list/featured/GET_FEATURED_USERS_LIST_PENDING',
  GET_FEATURED_USERS_LIST_SUCCESS = 'list/featured/GET_FEATURED_USERS_LIST_SUCCESS',
}

export const featuredCreators = {
  getfeaturedPosts: createAction(
    FeaturedActionType.GET_FEATURED_POSTS_LIST_REQUEST
  ),
  getfeaturedUsers: createAction(
    FeaturedActionType.GET_FEATURED_USERS_LIST_REQUEST
  ),
};

export interface FeaturedPostsSubState {
  _id: string;
  title: string;
  info: {
    likes: number;
    comments: number;
  };
  user: string;
}

export interface FeaturedUsersSubState {
  _id: string;
  profile: {
    thumbnail: string;
    shortBio: string;
    cover: string;
    username: string;
  };
}

export interface ListingSetPostState {
  post: FeaturedPostsSubState[];
  end: boolean;
  loading: boolean;
}

export interface ListingSetUserState {
  user: FeaturedUsersSubState[];
  end: boolean;
  loading: boolean;
}

export interface FeaturedState {
  posts: ListingSetPostState;
  users: ListingSetUserState;
}

const initialListingSetPost: ListingSetPostState = {
  post: [],
  end: false,
  loading: false,
};

const initialListingSetUser: ListingSetUserState = {
  user: [],
  end: false,
  loading: false,
};

const initialState: FeaturedState = {
  posts: initialListingSetPost,
  users: initialListingSetUser,
};

export default handleActions<FeaturedState, any>(
  {
    [FeaturedActionType.GET_FEATURED_POSTS_LIST_PENDING]: state => {
      return produce(state, draft => {
        draft.posts.loading = true;
      });
    },
    [FeaturedActionType.GET_FEATURED_POSTS_LIST_SUCCESS]: (
      state,
      action: ListType.FeaturedPostsAction
    ) => {
      return produce(state, draft => {
        if (action.payload === undefined) return;
        const {
          payload: { posts },
        } = action;
        draft.posts = {
          post: posts,
          end: false,
          loading: false,
        };
      });
    },
    [FeaturedActionType.GET_FEATURED_USERS_LIST_PENDING]: state => {
      return produce(state, draft => {
        draft.users.loading = true;
      });
    },
    [FeaturedActionType.GET_FEATURED_USERS_LIST_SUCCESS]: (
      state,
      action: ListType.FeaturedUsersAction
    ) => {
      return produce(state, draft => {
        if (action.payload === undefined) return;
        const {
          payload: { users },
        } = action;
        draft.users = {
          user: users,
          end: false,
          loading: false,
        };
      });
    },
  },
  initialState
);
