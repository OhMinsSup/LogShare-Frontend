import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import * as ListType from '../types/list';

export enum TagsActionType {
  REVEAL_TAGS_POSTS_PREFETCHED = 'list/tags/REVEAL_TAGS_POSTS_PREFETCHED',

  GET_TAGS_POSTS_LIST_REQUEST = 'list/tags/GET_TAGS_POSTS_LIST_REQUEST',
  GET_TAGS_POSTS_LIST_PENDING = 'list/tags/GET_TAGS_POSTS_LIST_PENDING',
  GET_TAGS_POSTS_LIST_SUCCESS = 'list/tags/GET_TAGS_POSTS_LIST_SUCCESS',

  PREFETCH_TAGS_POSTS_LIST_REQUEST = 'list/tags/PREFETCH_TAGS_POSTS_LIST_REQUEST',
  PREFETCH_TAGS_POSTS_LIST_SUCCESS = 'list/tags/PREFETCH_TAGS_POSTS_LIST_SUCCESS',
}

export const tagsCreators = {
  getTagsPosts: createAction(
    TagsActionType.GET_TAGS_POSTS_LIST_REQUEST,
    (payload: ListType.TagsPostsPayload) => payload
  ),
  prefetchTagsPosts: createAction(
    TagsActionType.PREFETCH_TAGS_POSTS_LIST_REQUEST,
    (payload: ListType.PrefetchListPayload) => payload
  ),
  revealTagsPostsPrefetched: createAction(
    TagsActionType.REVEAL_TAGS_POSTS_PREFETCHED
  ),
};

export interface PostsSubState {
  postId: string;
  title: string;
  body: string;
  post_thumbnail: string | null;
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

export interface ListingSetState {
  post: PostsSubState[];
  prefetched: PostsSubState[];
  end: boolean;
  next: string;
  loading: boolean;
}

export interface TagsState {
  tags_posts: ListingSetState;
}

const initialListingSet: ListingSetState = {
  post: [],
  prefetched: [],
  end: false,
  next: '',
  loading: false,
};

const initialState: TagsState = {
  tags_posts: initialListingSet,
};

export default handleActions<TagsState, any>(
  {
    [TagsActionType.REVEAL_TAGS_POSTS_PREFETCHED]: state => {
      return produce(state, draft => {
        const { post, prefetched } = draft.tags_posts;
        if (post && prefetched) {
          post.push(...prefetched);
          draft.tags_posts.prefetched = [];
        }
      });
    },
    [TagsActionType.GET_TAGS_POSTS_LIST_PENDING]: state => {
      return produce(state, draft => {
        draft.tags_posts.loading = true;
      });
    },
    [TagsActionType.GET_TAGS_POSTS_LIST_SUCCESS]: (
      state,
      action: ListType.PostsListAction
    ) => {
      return produce(state, draft => {
        if (action.payload === undefined) return;
        const {
          payload: { posts },
        } = action;
        draft.tags_posts = {
          post: posts.postWithData,
          prefetched: [],
          end: false,
          next: posts.next,
          loading: false,
        };
      });
    },
    [TagsActionType.PREFETCH_TAGS_POSTS_LIST_SUCCESS]: (
      state,
      action: ListType.PostsListAction
    ) => {
      return produce(state, draft => {
        if (action.payload === undefined) return;
        const {
          payload: { posts },
        } = action;
        draft.tags_posts.prefetched = posts.postWithData;
        draft.tags_posts.next = posts.next;
        if (posts.postWithData && posts.postWithData.length === 0) {
          draft.tags_posts.end = true;
        }
      });
    },
  },
  initialState
);
