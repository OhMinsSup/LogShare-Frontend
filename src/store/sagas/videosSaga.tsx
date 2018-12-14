import { put, call, takeEvery, fork, all } from 'redux-saga/effects';
import { VideosActionType, VideosSubState } from '../modules/list/videos';
import { ErrorActionType } from '../modules/error';
import * as ListAPI from '../../lib/api/list';
import { Action } from 'redux';
import { AxiosResponse } from 'axios';

export interface FetchGetPosts
  extends Action<VideosActionType.GET_VIDEOS_LIST_REQUEST> {
  payload: {
    username?: string | null;
  };
}

export interface FetchPrefetchPosts
  extends Action<VideosActionType.PREFETCH_VIDEOS_LIST_REQUEST> {
  payload: {
    next: string;
  };
}

export interface VideosDataState {
  videosWithData: VideosSubState[];
  next: string;
}

function* getVideos(action: FetchGetPosts) {
  const {
    payload: { username },
  } = action;

  yield put({
    type: VideosActionType.GET_VIDEOS_LIST_PENDING,
  });

  try {
    const responseGetVideos: AxiosResponse<VideosDataState> = yield call(
      ListAPI.listVideos,
      username
    );

    yield put({
      type: VideosActionType.GET_VIDEOS_LIST_SUCCESS,
      payload: {
        videos: responseGetVideos.data,
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

function* prefetchVideos(action: FetchPrefetchPosts) {
  const {
    payload: { next },
  } = action;

  try {
    const responsePrefetchVideos: AxiosResponse<VideosDataState> = yield call(
      ListAPI.next,
      next
    );

    yield put({
      type: VideosActionType.PREFETCH_VIDEOS_LIST_SUCCESS,
      payload: {
        videos: responsePrefetchVideos.data,
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

function* watchGetVideos() {
  yield takeEvery(VideosActionType.GET_VIDEOS_LIST_REQUEST, getVideos);
}

function* watchPrefetchVideos() {
  yield takeEvery(
    VideosActionType.PREFETCH_VIDEOS_LIST_REQUEST,
    prefetchVideos
  );
}

export default function* videosSaga() {
  yield all([fork(watchGetVideos), fork(watchPrefetchVideos)]);
}
