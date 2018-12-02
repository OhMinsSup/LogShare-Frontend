import { handleActions, createAction } from 'redux-actions';
import produce from 'immer';
import * as SearchType from './types/search';

export enum SearchActionType {
  CHANGE_INPUT = 'search/CHANGE_INPUT',
  CHANGE_SEARCH_TYPE = 'search/CHANGE_SEARCH_TYPE',

  SEARCH_POSTS_LIST_REQUEST = 'search/SEARCH_POSTS_LIST_REQUEST',
  SEARCH_POSTS_LIST_PENDING = 'search/SEARCH_POSTS_LIST_PENDING',
  SEARCH_POSTS_LIST_SUCCESS = 'search/SEARCH_POSTS_LIST_SUCCESS',

  SEARCH_USERS_LIST_REQUEST = 'search/SEARCH_USERS_LIST_REQUEST',
  SEARCH_USERS_LIST_PENDING = 'search/SEARCH_USERS_LIST_PENDING',
  SEARCH_USERS_LIST_SUCCESS = 'search/SEARCH_USERS_LIST_SUCCESS',
}

export const searchCreators = {
  changeInput: createAction(
    SearchActionType.CHANGE_INPUT,
    (payload: SearchType.ChangeInputPayload) => payload
  ),
  changeSearchType: createAction(
    SearchActionType.CHANGE_SEARCH_TYPE,
    (payload: SearchType.changeSearchTypePayload) => payload
  ),
  searchPost: createAction(
    SearchActionType.SEARCH_POSTS_LIST_REQUEST,
    (payload: SearchType.SearchValuePayload) => payload
  ),
  searchUser: createAction(
    SearchActionType.SEARCH_USERS_LIST_REQUEST,
    (payload: SearchType.SearchValuePayload) => payload
  ),
};

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

export interface SearchUserDataState {
  username: string;
  thumbnail: string;
  cover: string;
  shortBio: string;
  _id: string;
}

export interface SearchState {
  type: 'post' | 'user';
  loading: boolean;
  value: string;
  posts: SearchPostDataState[];
  users: SearchUserDataState[];
}

const initialState: SearchState = {
  type: 'post',
  value: '',
  loading: false,
  posts: [],
  users: [],
};

export default handleActions<SearchState, any>(
  {
    [SearchActionType.CHANGE_INPUT]: (
      state,
      action: SearchType.ChangeInputAction
    ) => {
      return produce(state, draft => {
        if (action.payload === undefined) return;
        draft.value = action.payload.value;
      });
    },
    [SearchActionType.CHANGE_SEARCH_TYPE]: (
      state,
      action: SearchType.ChangeSearchTypeAction
    ) => {
      return produce(state, draft => {
        if (action.payload === undefined) return;
        draft.type = action.payload.type;
      });
    },
    [SearchActionType.SEARCH_USERS_LIST_PENDING]: state => {
      return produce(state, draft => {
        draft.loading = true;
      });
    },
    [SearchActionType.SEARCH_POSTS_LIST_PENDING]: state => {
      return produce(state, draft => {
        draft.loading = true;
      });
    },
    [SearchActionType.SEARCH_POSTS_LIST_SUCCESS]: (
      state,
      action: SearchType.SearchPostsAction
    ) => {
      return produce(state, draft => {
        if (action.payload === undefined) return;
        const {
          payload: { posts },
        } = action;
        draft.posts = posts;
        draft.loading = false;
      });
    },
    [SearchActionType.SEARCH_USERS_LIST_SUCCESS]: (
      state,
      action: SearchType.SearchUsersAction
    ) => {
      return produce(state, draft => {
        if (action.payload === undefined) return;
        const {
          payload: { users },
        } = action;
        draft.users = users;
        draft.loading = false;
      });
    },
  },
  initialState
);
