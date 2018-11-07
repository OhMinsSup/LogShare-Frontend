import { take, fork, put, call } from 'redux-saga/effects';
import { AsyncAuthType } from '../modules/auth';
import * as AuthAPI from '../../lib/api/auth';

type ChekcExistsPayload = { payload: { key: string; value: string } };
type ChekcExistsResponse = { data: { exists: boolean } };

export function* checkExists() {
  const {
    payload: { key, value },
  }: ChekcExistsPayload = yield take(AsyncAuthType.CHECK_EXISTS);

  try {
    const response: ChekcExistsResponse = yield call(AuthAPI.checkExists, {
      key,
      value,
    });

    yield put({
      type: AsyncAuthType.CHECK_EXISTS_SUCCESS,
      payload: {
        exists: response.data.exists,
        key,
      },
    });
  } catch (e) {
    yield put({
      type: AsyncAuthType.CHECK_EXISTS_ERROR,
    });
  }
}

export default function* authSaga() {
  yield fork(checkExists);
}
