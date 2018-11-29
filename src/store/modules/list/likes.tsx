import { handleActions, createAction } from 'redux-actions';
import produce from 'immer';
import * as ListType from '../types/list';

export enum LikesActionType {
  REVEAL_LIKES_PREFETCHED = 'list/likes/REVEAL_LIKES_PREFETCHED',

  GET_LIKES_LIST_REQUEST = 'list/likes/GET_LIKES_LIST_REQUEST',
  GET_LIKES_LIST_PENDING = 'list/likes/GET_LIKES_LIST_PENDING',
  GET_LIKES_LIST_SUCCESS = 'list/likes/GET_LIKES_LIST_SUCCESS',

  PREFETCH_LIKES_LIST_REQUEST = 'list/likes/PREFETCH_LIKES_LIST_REQUEST',
  PREFETCH_LIKES_LIST_SUCCESS = 'list/likes/PREFETCH_LIKES_LIST_SUCCESS',
}

export const likesCreators = {
  getLikePosts: createAction(
    LikesActionType.GET_LIKES_LIST_REQUEST,
    (payload: ListType.ListPostsPayload) => payload
  ),
  prefetchLikePosts: createAction(
    LikesActionType.PREFETCH_LIKES_LIST_REQUEST,
    (payload: ListType.PrefetchListPayload) => payload
  ),
  revealLikePostsPrefetched: createAction(
    LikesActionType.REVEAL_LIKES_PREFETCHED
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

export interface LikesState {
  likes: ListingSetState;
}

const initialListingSet: ListingSetState = {
  post: [],
  prefetched: [],
  end: false,
  next: '',
  loading: false,
};

const initialState: LikesState = {
  likes: initialListingSet,
};

export default handleActions<LikesState, any>(
  {
    [LikesActionType.REVEAL_LIKES_PREFETCHED]: state => {
      return produce(state, draft => {
        const { post, prefetched } = draft.likes;
        if (post && prefetched) {
          post.push(...prefetched);
          draft.likes.prefetched = [];
        }
      });
    },
    [LikesActionType.GET_LIKES_LIST_PENDING]: state => {
      return produce(state, draft => {
        draft.likes.loading = true;
      });
    },
    [LikesActionType.GET_LIKES_LIST_SUCCESS]: (
      state,
      action: ListType.PostsListAction
    ) => {
      return produce(state, draft => {
        if (action.payload === undefined) return;
        const {
          payload: { posts },
        } = action;
        draft.likes = {
          post: posts.postWithData,
          prefetched: [],
          end: false,
          next: posts.next,
          loading: false,
        };
      });
    },
    [LikesActionType.PREFETCH_LIKES_LIST_SUCCESS]: (
      state,
      action: ListType.PostsListAction
    ) => {
      return produce(state, draft => {
        if (action.payload === undefined) return;
        const {
          payload: { posts },
        } = action;
        draft.likes.prefetched = posts.postWithData;
        draft.likes.next = posts.next;
        if (posts.postWithData && posts.postWithData.length === 0) {
          draft.likes.end = true;
        }
      });
    },
  },
  initialState
);
