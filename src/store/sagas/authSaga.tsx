import { fork, put, call, takeEvery, select } from 'redux-saga/effects';
import { AuthActionType } from '../modules/auth';
import * as AuthAPI from '../../lib/api/auth';
import { StoreState } from '../modules';
import { UserActionType } from '../modules/user';

type LocalRegisterPayload = {
  payload: { email: string; username: string; password: string };
};
type LocalRegisterResponse = {
  data: {
    user: {
      username: string;
      thumbnail: string;
      shortBio: string;
      email: string;
    };
  };
};
type ChekcExistsPayload = { payload: { key: string; value: string } };
type ChekcExistsResponse = { data: { exists: boolean } };

function* checkExists(action: any) {
  const {
    payload: { key, value },
  }: ChekcExistsPayload = action;

  try {
    const response: ChekcExistsResponse = yield call(AuthAPI.checkExists, {
      key,
      value,
    });

    yield put({
      type: AuthActionType.CHECK_EXISTS_SUCCESS,
      payload: {
        exists: response.data.exists,
        key,
      },
    });

    const existsSelect: { email: boolean; username: string } = yield select(
      ({ auth }: StoreState) => auth.exists
    );

    if (existsSelect.email) {
      yield put({
        type: AuthActionType.SET_ERROR,
        payload: {
          form: 'register_form',
          name: 'error',
          message: '이미 존재하는 이메일입니다.',
        },
      });
    } else if (existsSelect.username) {
      yield put({
        type: AuthActionType.SET_ERROR,
        payload: {
          form: 'register_form',
          name: 'error',
          message: '이미 존재하는 아이디입니다.',
        },
      });
    }
  } catch (e) {
    yield put({
      type: AuthActionType.CHECK_EXISTS_ERROR,
      error: e.message,
    });
  }
}

function* localRegister(action: any) {
  const {
    payload: { email, username, password },
  }: LocalRegisterPayload = action;

  try {
    const response: LocalRegisterResponse = yield call(AuthAPI.localRegister, {
      email,
      username,
      password,
    });

    yield put({
      type: AuthActionType.LOCAL_REGISTER_SUCCESS,
      payload: {
        user: response.data.user,
      },
    });

    const authResult = yield select(
      (state: StoreState) => state.auth.authResult
    );

    yield put({
      type: UserActionType.SET_USER_REQUEST,
      payload: {
        authResult,
      },
    });
  } catch (e) {
    yield put({
      type: AuthActionType.LOCAL_REGISTER_ERROR,
      error: e.message,
    });
  }
}

function* watchCheckExists() {
  yield takeEvery(AuthActionType.CHECK_EXISTS_REQUEST, checkExists);
}

function* watchLocalRegister() {
  yield takeEvery(AuthActionType.LOCAL_REGISTER_REQUEST, localRegister);
}

export default function* authSaga() {
  yield [fork(watchCheckExists), fork(watchLocalRegister)];
}
