import { put, call, takeEvery, fork, all } from 'redux-saga/effects';
import { TrendingActionType } from '../modules/list/trending';
import { ErrorActionType } from '../modules/error';
import * as ListAPI from '../../lib/api/list';

function* getTrending(action: any) {
  yield put({
    type: TrendingActionType.GET_TRENDING_LIST_PENDING,
  });

  try {
    const responseGetPosts = yield call(ListAPI.terendingPosts);

    yield put({
      type: TrendingActionType.GET_TRENDING_LIST_SUCCESS,
      payload: {
        posts: responseGetPosts.data,
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

function* prefetchTrending(action: any) {
  const {
    payload: { next },
  } = action;

  try {
    const responsePrefetchPosts = yield call(ListAPI.next, next);

    yield put({
      type: TrendingActionType.PREFETCH_TRENDING_LIST_SUCCESS,
      payload: {
        posts: responsePrefetchPosts.data,
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

function* watchGetTrending() {
  yield takeEvery(TrendingActionType.GET_TRENDING_LIST_REQUEST, getTrending);
}

function* watchPrefetchTrending() {
  yield takeEvery(
    TrendingActionType.PREFETCH_TRENDING_LIST_REQUEST,
    prefetchTrending
  );
}

export default function* trendingSaga() {
  yield all([fork(watchGetTrending), fork(watchPrefetchTrending)]);
}
