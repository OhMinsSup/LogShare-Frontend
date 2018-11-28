import { fork, takeEvery, all, put, call } from 'redux-saga/effects';
import { TagsActionType } from '../modules/list/tags';
import { ErrorActionType } from '../modules/error';
import * as TagAPI from '../../lib/api/tag';

function* getTags(action: any) {
  yield put({
    type: TagsActionType.GET_TAGS_PENDING,
  });

  try {
    const responseGetTags = yield call(TagAPI.getTag);

    yield put({
      type: TagsActionType.GET_TAGS_SUCCESS,
      payload: {
        tags: responseGetTags.data,
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

function* getTagsPosts(action: any) {
  const {
    payload: { tag },
  } = action;

  yield put({
    type: TagsActionType.GET_TAGS_POSTS_LIST_PENDING,
  });

  try {
    const responseGetTagsPosts = yield call(TagAPI.getTagInfo, tag);

    yield put({
      type: TagsActionType.GET_TAGS_POSTS_LIST_SUCCESS,
      payload: {
        posts: responseGetTagsPosts.data,
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

function* prefetchTagsPosts(action: any) {
  const {
    payload: { next },
  } = action;

  try {
    const responsePrefetchTagsPosts = yield call(TagAPI.next, next);

    yield put({
      type: TagsActionType.PREFETCH_TAGS_POSTS_LIST_SUCCESS,
      payload: {
        posts: responsePrefetchTagsPosts.data,
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

function* watchGetTagsPosts() {
  yield takeEvery(TagsActionType.GET_TAGS_POSTS_LIST_REQUEST, getTagsPosts);
}

function* watchPrefetchTagsPosts() {
  yield takeEvery(
    TagsActionType.PREFETCH_TAGS_POSTS_LIST_REQUEST,
    prefetchTagsPosts
  );
}

function* watchGetTags() {
  yield takeEvery(TagsActionType.GET_TAGS_REQUEST, getTags);
}

export default function* tagsSaga() {
  yield all([
    fork(watchGetTags),
    fork(watchGetTagsPosts),
    fork(watchPrefetchTagsPosts),
  ]);
}
