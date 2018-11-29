import { fork, all } from 'redux-saga/effects';
import authSaga from './authSaga';
import userSaga from './userSaga';
import wrtieSaga from './writeSaga';
import postSaga from './postSaga';
import postsSaga from './postsSaga';
import trendingSaga from './trendingSaga';
import tagsSaga from './tagsSaga';
import likesSaga from './likesSaga';

export default function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(userSaga),
    fork(wrtieSaga),
    fork(postSaga),
    fork(postsSaga),
    fork(trendingSaga),
    fork(tagsSaga),
    fork(likesSaga),
  ]);
}
