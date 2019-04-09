import { handleActions, createAction } from 'redux-actions';
import produce from 'immer';
import { PostsSubState } from './list/posts';

export enum SearchActionType {
  PUBLIC_SEARCH_REQUEST = 'search/PUBLIC_SEARCH_REQUEST',
  PUBLIC_SEARCH_PENDING = 'search/PUBLIC_SEARCH_PENDING',
  PUBLIC_SEARCH_SUCCESS = 'search/PUBLIC_SEARCH_SUCCESS',

  NEXT_PUBLIC_SEARCH_REQUEST = 'search/NEXT_PUBLIC_SEARCH_REQUEST',
  NEXT_PUBLIC_SEARCH_PENDING = 'search/NEXT_PUBLIC_SEARCH_PENDING',
  NEXT_PUBLIC_SEARCH_SUCCESS = 'search/NEXT_PUBLIC_SEARCH_SUCCESS',

  INITIALIZE = 'search/INITIALIZE',
}

export const searchCreators = {
  publicSearchRequest: createAction(
    SearchActionType.PUBLIC_SEARCH_REQUEST,
    (payload: { q: string; username?: string; page?: number }) => payload
  ),
  publicSearchPending: createAction(
    SearchActionType.PUBLIC_SEARCH_PENDING,
    (payload: { q: string; username?: string; page?: number }) => payload
  ),
  publicSearchSuccess: createAction(
    SearchActionType.PUBLIC_SEARCH_SUCCESS,
    (payload: { result: PostsSubState[]; count: number }) => payload
  ),

  nextPublicSearchRequest: createAction(
    SearchActionType.NEXT_PUBLIC_SEARCH_REQUEST,
    (payload: { q: string; username?: string; page?: number }) => payload
  ),
  nextPublicSearchPending: createAction(
    SearchActionType.NEXT_PUBLIC_SEARCH_PENDING,
    (payload: { q: string; username?: string; page?: number }) => payload
  ),
  nextPublicSearchSuccess: createAction(
    SearchActionType.NEXT_PUBLIC_SEARCH_SUCCESS,
    (payload: { result: PostsSubState[]; count: number }) => payload
  ),

  initialize: createAction(SearchActionType.INITIALIZE),
};

type PublicSearchPending = ReturnType<
  typeof searchCreators.publicSearchPending
>;
type PublicSearchSuccess = ReturnType<
  typeof searchCreators.publicSearchSuccess
>;
type NextPublicSearchPending = ReturnType<
  typeof searchCreators.nextPublicSearchPending
>;
type NextPublicSearchSuccess = ReturnType<
  typeof searchCreators.nextPublicSearchSuccess
>;

export interface SearchPostDataState {
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

export interface SearchState {
  results: {
    count: number;
    data: PostsSubState[];
  } | null;
  // public pending
  ppending: boolean;
  // next pending
  npending: boolean;
  currentPage: number;
  currentKeyword: string;
}

const initialState: Readonly<SearchState> = {
  results: null,
  ppending: false,
  npending: false,
  currentPage: 1,
  currentKeyword: '',
};

export default handleActions<SearchState, any>(
  {
    [SearchActionType.INITIALIZE]: state => {
      return {
        ...state,
        initialState,
      };
    },
    [SearchActionType.PUBLIC_SEARCH_PENDING]: (
      state,
      action: PublicSearchPending
    ) => {
      return produce(state, draft => {
        if (typeof action.payload === 'undefined') return;
        draft.currentPage = 1;
        draft.currentKeyword = action.payload.q;
        draft.ppending = true;
      });
    },
    [SearchActionType.PUBLIC_SEARCH_SUCCESS]: (
      state,
      action: PublicSearchSuccess
    ) => {
      return produce(state, draft => {
        if (typeof action.payload === 'undefined') return;
        draft.ppending = false;
        draft.results = {
          data: action.payload.result,
          count: action.payload.count,
        };
      });
    },
    [SearchActionType.NEXT_PUBLIC_SEARCH_PENDING]: (
      state,
      action: NextPublicSearchPending
    ) => {
      return produce(state, draft => {
        if (typeof action.payload === 'undefined') return;
        const { payload } = action;
        if (!payload.page) return;
        draft.currentPage = payload.page;
        draft.npending = true;
      });
    },
    [SearchActionType.NEXT_PUBLIC_SEARCH_SUCCESS]: (
      state,
      action: NextPublicSearchSuccess
    ) => {
      return produce(state, draft => {
        if (typeof action.payload === 'undefined') return;
        if (!draft.results) return;
        draft.npending = false;
        draft.results.data = draft.results.data.concat(action.payload.result);
        draft.results.count = action.payload.count;
      });
    },
  },
  initialState
);
