import { put, call, takeEvery, fork, all } from 'redux-saga/effects';
import { NoticesActionType, MessageSubState } from '../modules/list/notices';
import { ErrorActionType } from '../modules/error';
import * as ListAPI from '../../lib/api/list';
import { Action } from 'redux';
import { AxiosResponse } from 'axios';

export interface FetchGetNotices
  extends Action<NoticesActionType.GET_NOTICES_LIST_REQUEST> {
  payload?: any;
}

export interface FetchPrefetchNotices
  extends Action<NoticesActionType.PREFETCH_NOTICES_LIST_REQUEST> {
  payload: {
    next: string;
  };
}

export interface NoticeDataState {
  message: MessageSubState[];
  next: string;
}

function* getNotices(action: FetchGetNotices) {
  yield put({
    type: NoticesActionType.GET_NOTICES_LIST_PENDING,
  });

  try {
    const responseGetNotices: AxiosResponse<NoticeDataState> = yield call(
      ListAPI.noticesMessage
    );

    yield put({
      type: NoticesActionType.GET_NOTICES_LIST_SUCCESS,
      payload: {
        message: responseGetNotices.data.message,
        next: responseGetNotices.data.next,
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

function* prefetchNotices(action: FetchPrefetchNotices) {
  const {
    payload: { next },
  } = action;

  try {
    const responsePrefetchNotices: AxiosResponse<NoticeDataState> = yield call(
      ListAPI.next,
      next
    );

    yield put({
      type: NoticesActionType.PREFETCH_NOTICES_LIST_SUCCESS,
      payload: {
        message: responsePrefetchNotices.data.message,
        next: responsePrefetchNotices.data.next,
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

function* watchGetNotices() {
  yield takeEvery(NoticesActionType.GET_NOTICES_LIST_REQUEST, getNotices);
}

function* watchPrefetchNotices() {
  yield takeEvery(
    NoticesActionType.PREFETCH_NOTICES_LIST_REQUEST,
    prefetchNotices
  );
}

export default function* postsSaga() {
  yield all([fork(watchGetNotices), fork(watchPrefetchNotices)]);
}
