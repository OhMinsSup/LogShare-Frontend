import { fork, put, take, call, all } from 'redux-saga/effects';
import { UserActionType } from '../modules/user';
import storage from 'src/lib/storage';
import * as AuthAPI from '../../lib/api/auth';
import { ErrorActionType } from '../modules/error';

function* setUser() {
  const {
    payload: { authResult },
  } = yield take(UserActionType.SET_USER_REQUEST);

  if (!authResult || authResult === undefined) {
    storage.remove('__log_share__');
    return;
  }

  yield put({
    type: UserActionType.SET_USER_SUCCESS,
    payload: {
      authResult,
    },
  });

  storage.set('__log_share__', authResult);
  window.location.href = '/';
}

function* logOut() {
  yield take(UserActionType.LOGOUT);

  try {
    yield call(AuthAPI.logout);

    storage.remove('__log_share__');
    window.location.href = '/';
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

export default function* userSaga() {
  yield all([fork(setUser), fork(logOut)]);
}
