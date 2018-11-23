import { fork, all } from 'redux-saga/effects';
import authSaga from './authSaga';
import userSaga from './userSaga';
import wrtieSaga from './writeSaga';
import postSaga from './postSaga';
import postsListSaga from './postsListSaga';

export default function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(userSaga),
    fork(wrtieSaga),
    fork(postSaga),
    fork(postsListSaga),
  ]);
}
