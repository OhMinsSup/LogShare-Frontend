import { put, call, takeEvery, fork, all } from 'redux-saga/effects';
import { TrendingActionType, PostsSubState } from '../modules/list/trending';
import { ErrorActionType } from '../modules/error';
import * as ListAPI from '../../lib/api/list';
import { Action } from 'redux';
import { AxiosResponse } from 'axios';

export interface FetchGetTrending
  extends Action<TrendingActionType.GET_TRENDING_LIST_REQUEST> {
  payload?: any;
}

export interface FetchPrefetchTrending
  extends Action<TrendingActionType.PREFETCH_TRENDING_LIST_REQUEST> {
  payload: {
    next: string;
  };
}

export interface PostsDataState {
  postWithData: PostsSubState[];
  next: string;
}

function* getTrending(action: FetchGetTrending) {
  yield put({
    type: TrendingActionType.GET_TRENDING_LIST_PENDING,
  });

  try {
    const responseGetPosts: AxiosResponse<PostsDataState> = yield call(
      ListAPI.terendingPosts
    );

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

function* prefetchTrending(action: FetchPrefetchTrending) {
  const {
    payload: { next },
  } = action;

  try {
    const responsePrefetchPosts: AxiosResponse<PostsDataState> = yield call(
      ListAPI.next,
      next
    );

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
