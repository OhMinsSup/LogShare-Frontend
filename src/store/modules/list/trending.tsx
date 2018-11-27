import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import * as ListType from '../types/list';

export enum TrendingActionType {
  REVEAL_TRENDING_PREFETCHED = 'list/trending/REVEAL_TRENDING_PREFETCHED',

  GET_TRENDING_LIST_REQUEST = 'list/trending/GET_TRENDING_LIST_REQUEST',
  GET_TRENDING_LIST_PENDING = 'list/trending/GET_TRENDING_LIST_PENDING',
  GET_TRENDING_LIST_SUCCESS = 'list/trending/GET_TRENDING_LIST_SUCCESS',

  PREFETCH_TRENDING_LIST_REQUEST = 'list/trending/PREFETCH_TRENDING_LIST_REQUEST',
  PREFETCH_TRENDING_LIST_SUCCESS = 'list/trending/PREFETCH_TRENDING_LIST_SUCCESS',
}

export const trendingCreators = {
  getTrending: createAction(TrendingActionType.GET_TRENDING_LIST_REQUEST),
  prefetchTrending: createAction(
    TrendingActionType.PREFETCH_TRENDING_LIST_REQUEST,
    (payload: ListType.PrefetchListPayload) => payload
  ),
  revealTrendingPrefetched: createAction(
    TrendingActionType.REVEAL_TRENDING_PREFETCHED
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

export interface TrendingState {
  trending: ListingSetState;
}

const initialListingSet: ListingSetState = {
  post: [],
  prefetched: [],
  end: false,
  next: '',
  loading: false,
};

const initialState: TrendingState = {
  trending: initialListingSet,
};

export default handleActions<TrendingState, any>(
  {
    [TrendingActionType.REVEAL_TRENDING_PREFETCHED]: state => {
      return produce(state, draft => {
        const { post, prefetched } = draft.trending;
        if (post && prefetched) {
          post.push(...prefetched);
          draft.trending.prefetched = [];
        }
      });
    },
    [TrendingActionType.GET_TRENDING_LIST_PENDING]: state => {
      return produce(state, draft => {
        draft.trending.loading = true;
      });
    },
    [TrendingActionType.GET_TRENDING_LIST_SUCCESS]: (
      state,
      action: ListType.PostsListAction
    ) => {
      return produce(state, draft => {
        if (action.payload === undefined) return;
        const {
          payload: { posts },
        } = action;
        draft.trending = {
          post: posts.postWithData,
          prefetched: [],
          end: false,
          next: posts.next,
          loading: false,
        };
      });
    },
    [TrendingActionType.PREFETCH_TRENDING_LIST_SUCCESS]: (
      state,
      action: ListType.PostsListAction
    ) => {
      return produce(state, draft => {
        if (action.payload === undefined) return;
        const {
          payload: { posts },
        } = action;
        draft.trending.prefetched = posts.postWithData;
        draft.trending.next = posts.next;
        if (posts.postWithData && posts.postWithData.length === 0) {
          draft.trending.end = true;
        }
      });
    },
  },
  initialState
);
