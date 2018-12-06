import { put, call, takeEvery, fork, all } from 'redux-saga/effects';
import {
  SearchActionType,
  SearchPostDataState,
  SearchUserDataState,
} from '../modules/search';
import { ErrorActionType } from '../modules/error';
import * as SearchAPI from '../../lib/api/search';
import { Action } from 'redux';
import { AxiosResponse } from 'axios';

export interface FetchSearchPosts
  extends Action<SearchActionType.SEARCH_POSTS_LIST_REQUEST> {
  payload: {
    value: string;
  };
}

export interface FetchSearchUsers
  extends Action<SearchActionType.SEARCH_USERS_LIST_REQUEST> {
  payload: {
    value: string;
  };
}

function* searchPosts(action: FetchSearchPosts) {
  const {
    payload: { value },
  } = action;

  yield put({
    type: SearchActionType.SEARCH_POSTS_LIST_PENDING,
  });

  try {
    const responseSearchPosts: AxiosResponse<
      SearchPostDataState[]
    > = yield call(SearchAPI.searchPost, value);

    yield put({
      type: SearchActionType.SEARCH_POSTS_LIST_SUCCESS,
      payload: {
        posts: responseSearchPosts.data,
      },
    });
  } catch (e) {
    yield put({
      type: ErrorActionType.ERROR,
      payload: {
        error: true,
        code: e.response.status,
      },
    });
  }
}

function* searchUsers(action: FetchSearchUsers) {
  const {
    payload: { value },
  } = action;

  yield put({
    type: SearchActionType.SEARCH_USERS_LIST_PENDING,
  });

  try {
    const responseSearchUsers: AxiosResponse<
      SearchUserDataState[]
    > = yield call(SearchAPI.searchUser, value);

    yield put({
      type: SearchActionType.SEARCH_USERS_LIST_SUCCESS,
      payload: {
        users: responseSearchUsers.data,
      },
    });
  } catch (e) {
    yield put({
      type: ErrorActionType.ERROR,
      payload: {
        error: true,
        code: e.response.status,
      },
    });
  }
}

function* watchSearchUsers() {
  yield takeEvery(SearchActionType.SEARCH_USERS_LIST_REQUEST, searchUsers);
}

function* watchSearchPosts() {
  yield takeEvery(SearchActionType.SEARCH_POSTS_LIST_REQUEST, searchPosts);
}

export default function* postsSaga() {
  yield all([fork(watchSearchPosts), fork(watchSearchUsers)]);
}
