import { fork, put, take, call, all, takeEvery } from 'redux-saga/effects';
import { UserActionType } from '../modules/user';
import storage from 'src/lib/storage';
import * as AuthAPI from '../../lib/api/auth';
import * as UserAPI from '../../lib/api/user';
import { ErrorActionType } from '../modules/error';

function* getUserProfileInfo(action: any) {
  const {
    payload: { username },
  } = action;

  try {
    const responseGetUserProfileInfo = yield call(
      UserAPI.getUserInfo,
      username
    );

    yield put({
      type: UserActionType.GET_USER_PROFILE_INFO_SUCCESS,
      payload: {
        profile: responseGetUserProfileInfo.data,
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

function* watchGetUserProfileInfo() {
  yield takeEvery(
    UserActionType.GET_USER_PROFILE_INFO_REQUEST,
    getUserProfileInfo
  );
}

export default function* userSaga() {
  yield all([fork(setUser), fork(logOut), fork(watchGetUserProfileInfo)]);
}
