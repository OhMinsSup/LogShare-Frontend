import { put, call, takeEvery, fork, all } from 'redux-saga/effects';
import { NoticesActionType } from '../modules/list/notices';
import { ErrorActionType } from '../modules/error';
import * as ListAPI from '../../lib/api/list';

function* getNotices(action: any) {
  yield put({
    type: NoticesActionType.GET_NOTICES_LIST_PENDING,
  });

  try {
    const responseGetNotices = yield call(ListAPI.noticesMessage);

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

function* prefetchNotices(action: any) {
  const {
    payload: { next },
  } = action;

  try {
    const responsePrefetchNotices = yield call(ListAPI.next, next);

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
