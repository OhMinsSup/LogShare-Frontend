import { handleActions, createAction } from 'redux-actions';
import produce from 'immer';
import * as ListType from '../types/list';

export enum UserPostsActionType {
  REVEAL_POSTS_PREFETCHED = 'list/userPosts/REVEAL_POSTS_PREFETCHED',

  GET_USER_POSTS_LIST_REQUEST = 'list/userPosts/GET_USER_POSTS_LIST_REQUEST',
  GET_USER_POSTS_LIST_PENDING = 'list/userPosts/GET_USER_POSTS_LIST_PENDING',
  GET_USER_POSTS_LIST_SUCCESS = 'list/userPosts/GET_USER_POSTS_LIST_SUCCESS',

  PREFETCH_USER_POSTS_LIST_REQUEST = 'list/userPosts/PREFETCH_USER_POSTS_LIST_REQUEST',
  PREFETCH_USER_POSTS_LIST_SUCCESS = 'list/userPosts/PREFETCH_USER_POSTS_LIST_SUCCESS',
}

export const userPostsCreators = {
  getUserPosts: createAction(
    UserPostsActionType.GET_USER_POSTS_LIST_REQUEST,
    (payload: ListType.ListPostsPayload) => payload
  ),
  prefetchUserPosts: createAction(
    UserPostsActionType.PREFETCH_USER_POSTS_LIST_REQUEST,
    (payload: ListType.PrefetchListPayload) => payload
  ),
  revealUserPostsPrefetched: createAction(
    UserPostsActionType.REVEAL_POSTS_PREFETCHED
  ),
};

export interface PostsSubState {
  postId: string;
  title: string;
  body: string;
  post_thumbnail: string | null;
  createdAt: string;
  info: {
    likes: number;
    comments: number;
  };
  tag: string[];
  user: {
    username: string;
    thumbnail: string;
    shortBio: string;
    _id: string;
  };
}

export interface ListingSetState {
  post: PostsSubState[];
  prefetched: PostsSubState[];
  end: boolean;
  next: string;
  loading: boolean;
}

export interface UserPostsState {
  userPosts: ListingSetState;
}

const initialListingSet: ListingSetState = {
  post: [],
  prefetched: [],
  end: false,
  next: '',
  loading: false,
};

const initialState: UserPostsState = {
  userPosts: initialListingSet,
};

export default handleActions<UserPostsState, any>(
  {
    [UserPostsActionType.REVEAL_POSTS_PREFETCHED]: state => {
      return produce(state, draft => {
        const { post, prefetched } = draft.userPosts;
        if (post && prefetched) {
          post.push(...prefetched);
          draft.userPosts.prefetched = [];
        }
      });
    },
    [UserPostsActionType.GET_USER_POSTS_LIST_PENDING]: state => {
      return produce(state, draft => {
        draft.userPosts.loading = true;
      });
    },
    [UserPostsActionType.GET_USER_POSTS_LIST_SUCCESS]: (
      state,
      action: ListType.PostsListAction
    ) => {
      return produce(state, draft => {
        if (action.payload === undefined) return;
        const {
          payload: { posts },
        } = action;
        draft.userPosts = {
          post: posts.postWithData,
          prefetched: [],
          end: false,
          next: posts.next,
          loading: false,
        };
      });
    },
    [UserPostsActionType.PREFETCH_USER_POSTS_LIST_SUCCESS]: (
      state,
      action: ListType.PostsListAction
    ) => {
      return produce(state, draft => {
        if (action.payload === undefined) return;
        const {
          payload: { posts },
        } = action;
        draft.userPosts.prefetched = posts.postWithData;
        draft.userPosts.next = posts.next;
        if (posts.postWithData && posts.postWithData.length === 0) {
          draft.userPosts.end = true;
        }
      });
    },
  },
  initialState
);
