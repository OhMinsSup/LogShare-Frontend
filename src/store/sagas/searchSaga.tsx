import { put, call, takeEvery, fork, all } from 'redux-saga/effects';
import { SearchActionType } from '../modules/search';
import { ErrorActionType } from '../modules/error';
import * as SearchAPI from '../../lib/api/search';

function* searchPosts(action: any) {
  const {
    payload: { value },
  } = action;

  yield put({
    type: SearchActionType.SEARCH_POSTS_LIST_PENDING,
  });

  try {
    const responseSearchPosts = yield call(SearchAPI.searchPost, value);

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

function* searchUsers(action: any) {
  const {
    payload: { value },
  } = action;

  yield put({
    type: SearchActionType.SEARCH_USERS_LIST_PENDING,
  });

  try {
    const responseSearchUsers = yield call(SearchAPI.searchUser, value);

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
