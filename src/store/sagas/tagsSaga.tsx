import { fork, takeEvery, all, put, call } from 'redux-saga/effects';
import { TagsActionType, TagsDataState } from '../modules/list/tags';
import { ErrorActionType } from '../modules/error';
import * as TagAPI from '../../lib/api/tag';
import { Action } from 'redux';
import { AxiosResponse } from 'axios';
import { PostsSubState } from '../modules/list/posts';

export interface FetchGetTags
  extends Action<TagsActionType.GET_TAGS_POSTS_LIST_REQUEST> {
  payload?: any;
}

export interface FetchGetTagsPosts
  extends Action<TagsActionType.GET_TAGS_POSTS_LIST_REQUEST> {
  payload: {
    tag: string;
  };
}

export interface FetchPrefetchTagsPosts
  extends Action<TagsActionType.PREFETCH_TAGS_POSTS_LIST_REQUEST> {
  payload: {
    next: string;
  };
}

export interface PostsDataState {
  postWithData: PostsSubState[];
  next: string;
}

function* getTags(action: FetchGetTags) {
  yield put({
    type: TagsActionType.GET_TAGS_PENDING,
  });

  try {
    const responseGetTags: AxiosResponse<TagsDataState[]> = yield call(
      TagAPI.getTag
    );

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

function* getTagsPosts(action: FetchGetTagsPosts) {
  const {
    payload: { tag },
  } = action;

  yield put({
    type: TagsActionType.GET_TAGS_POSTS_LIST_PENDING,
  });

  try {
    const responseGetTagsPosts: AxiosResponse<PostsDataState> = yield call(
      TagAPI.getTagInfo,
      tag
    );

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

function* prefetchTagsPosts(action: FetchPrefetchTagsPosts) {
  const {
    payload: { next },
  } = action;

  try {
    const responsePrefetchTagsPosts: AxiosResponse<PostsDataState> = yield call(
      TagAPI.next,
      next
    );

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
