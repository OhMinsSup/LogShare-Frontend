import { put, call, takeEvery, fork, all } from 'redux-saga/effects';
import { PostsActionType } from '../modules/list/posts';
import { ErrorActionType } from '../modules/error';
import * as ListAPI from '../../lib/api/list';

function* getPosts(action: any) {
  const {
    payload: { username },
  } = action;

  yield put({
    type: PostsActionType.GET_POSTS_LIST_PENDING,
  });

  try {
    const responseGetPosts = yield call(ListAPI.listPosts, username);

    yield put({
      type: PostsActionType.GET_POSTS_LIST_SUCCESS,
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

function* prefetchPosts(action: any) {
  const {
    payload: { next },
  } = action;

  try {
    const responsePrefetchPosts = yield call(ListAPI.next, next);

    yield put({
      type: PostsActionType.PREFETCH_POSTS_LIST_SUCCESS,
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

function* watchGetPosts() {
  yield takeEvery(PostsActionType.GET_POSTS_LIST_REQUEST, getPosts);
}

function* watchPrefetchPosts() {
  yield takeEvery(PostsActionType.PREFETCH_POSTS_LIST_REQUEST, prefetchPosts);
}

export default function* postsListSaga() {
  yield all([fork(watchGetPosts), fork(watchPrefetchPosts)]);
}
