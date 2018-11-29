import { put, call, takeEvery, fork, all } from 'redux-saga/effects';
import { LikesActionType } from '../modules/list/likes';
import { ErrorActionType } from '../modules/error';
import * as ListAPI from '../../lib/api/list';

function* getLikePosts(action: any) {
  const {
    payload: { username },
  } = action;

  yield put({
    type: LikesActionType.GET_LIKES_LIST_PENDING,
  });

  try {
    const responseGetPosts = yield call(ListAPI.likePosts, username);

    yield put({
      type: LikesActionType.GET_LIKES_LIST_SUCCESS,
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

function* prefetchLikePosts(action: any) {
  const {
    payload: { next },
  } = action;

  try {
    const responsePrefetchPosts = yield call(ListAPI.next, next);

    yield put({
      type: LikesActionType.PREFETCH_LIKES_LIST_SUCCESS,
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

function* watchGetLikePosts() {
  yield takeEvery(LikesActionType.GET_LIKES_LIST_REQUEST, getLikePosts);
}

function* watchPrefetchLikePosts() {
  yield takeEvery(
    LikesActionType.PREFETCH_LIKES_LIST_REQUEST,
    prefetchLikePosts
  );
}

export default function* likesSaga() {
  yield all([fork(watchGetLikePosts), fork(watchPrefetchLikePosts)]);
}
