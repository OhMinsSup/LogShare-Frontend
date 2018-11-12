import { fork, put, take, call } from 'redux-saga/effects';
import { UserActionType } from '../modules/user';
import storage from 'src/lib/storage';
import * as AuthAPI from '../../lib/api/auth';

type SetUserPayload = {
  payload: {
    authResult: {
      _id: string;
      username: string;
      thumbnail: string;
      shortBio: string;
      email: string;
    };
  };
};

function* setUser() {
  const {
    payload: { authResult },
  }: SetUserPayload = yield take(UserActionType.SET_USER_REQUEST);

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

  yield call(AuthAPI.logout);

  storage.remove('__log_share__');
  window.location.href = '/';
}

export default function* userSaga() {
  yield [fork(setUser), fork(logOut)];
}
