import { put, call, takeEvery, fork, all } from 'redux-saga/effects';
import { UsersActionType } from '../modules/list/users';
import { ErrorActionType } from '../modules/error';
import * as ListAPI from '../../lib/api/list';

function* getUsers(action: any) {
  yield put({
    type: UsersActionType.GET_USERS_LIST_PENDING,
  });

  try {
    const responseGetUsers = yield call(ListAPI.listUsers);

    yield put({
      type: UsersActionType.GET_USERS_LIST_SUCCESS,
      payload: {
        users: responseGetUsers.data,
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

function* prefetchUsers(action: any) {
  const {
    payload: { next },
  } = action;

  try {
    const responsePrefetchUsers = yield call(ListAPI.next, next);

    yield put({
      type: UsersActionType.PREFETCH_USERS_LIST_SUCCESS,
      payload: {
        users: responsePrefetchUsers.data,
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

function* watchPrefetchUsers() {
  yield takeEvery(UsersActionType.PREFETCH_USERS_LIST_REQUEST, prefetchUsers);
}

function* watchGetUsers() {
  yield takeEvery(UsersActionType.GET_USERS_LIST_REQUEST, getUsers);
}

export default function* followsSaga() {
  yield all([fork(watchGetUsers), fork(watchPrefetchUsers)]);
}
