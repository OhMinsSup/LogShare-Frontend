import { handleActions, createAction } from 'redux-actions';
import produce from 'immer';
import * as ListType from '../types/list';

export enum PostsActionType {
  REVEAL_POSTS_PREFETCHED = 'list/posts/REVEAL_POSTS_PREFETCHED',

  GET_POSTS_LIST_REQUEST = 'list/posts/GET_POSTS_LIST_REQUEST',
  GET_POSTS_LIST_PENDING = 'list/posts/GET_POSTS_LIST_PENDING',
  GET_POSTS_LIST_SUCCESS = 'list/posts/GET_POSTS_LIST_SUCCESS',

  PREFETCH_POSTS_LIST_REQUEST = 'list/posts/PREFETCH_POSTS_LIST_REQUEST',
  PREFETCH_POSTS_LIST_SUCCESS = 'list/posts/PREFETCH_POSTS_LIST_SUCCESS',
}

export const postsCreators = {
  getPosts: createAction(
    PostsActionType.GET_POSTS_LIST_REQUEST,
    (payload: ListType.ListPostsPayload) => payload
  ),
  prefetchPosts: createAction(
    PostsActionType.PREFETCH_POSTS_LIST_REQUEST,
    (payload: ListType.PrefetchListPayload) => payload
  ),
  revealPostsPrefetched: createAction(PostsActionType.REVEAL_POSTS_PREFETCHED),
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

export interface PostsState {
  posts: ListingSetState;
}

const initialListingSet: ListingSetState = {
  post: [],
  prefetched: [],
  end: false,
  next: '',
  loading: false,
};

const initialState: PostsState = {
  posts: initialListingSet,
};

export default handleActions<PostsState, any>(
  {
    [PostsActionType.REVEAL_POSTS_PREFETCHED]: state => {
      return produce(state, draft => {
        const { post, prefetched } = draft.posts;
        if (post && prefetched) {
          post.push(...prefetched);
          draft.posts.prefetched = [];
        }
      });
    },
    [PostsActionType.GET_POSTS_LIST_PENDING]: state => {
      return produce(state, draft => {
        draft.posts.loading = true;
      });
    },
    [PostsActionType.GET_POSTS_LIST_SUCCESS]: (
      state,
      action: ListType.PostsListAction
    ) => {
      return produce(state, draft => {
        if (action.payload === undefined) return;
        const {
          payload: { posts },
        } = action;
        draft.posts = {
          post: posts.postWithData,
          prefetched: [],
          end: false,
          next: posts.next,
          loading: false,
        };
      });
    },
    [PostsActionType.PREFETCH_POSTS_LIST_SUCCESS]: (
      state,
      action: ListType.PostsListAction
    ) => {
      return produce(state, draft => {
        if (action.payload === undefined) return;
        const {
          payload: { posts },
        } = action;
        draft.posts.prefetched = posts.postWithData;
        draft.posts.next = posts.next;
        if (posts.postWithData && posts.postWithData.length === 0) {
          draft.posts.end = true;
        }
      });
    },
  },
  initialState
);
