import { put, call, takeEvery, fork, all } from 'redux-saga/effects';
import { PostsActionType, PostsSubState } from '../modules/list/posts';
import { ErrorActionType } from '../modules/error';
import * as ListAPI from '../../lib/api/list';
import { Action } from 'redux';
import { AxiosResponse } from 'axios';

export interface FetchGetPosts
  extends Action<PostsActionType.GET_POSTS_LIST_REQUEST> {
  payload: {
    username?: string;
  };
}

export interface FetchPrefetchPosts
  extends Action<PostsActionType.PREFETCH_POSTS_LIST_REQUEST> {
  payload: {
    next: string;
  };
}

export interface PostsDataState {
  postWithData: PostsSubState[];
  next: string;
}

function* getPosts(action: FetchGetPosts) {
  const {
    payload: { username },
  } = action;

  yield put({
    type: PostsActionType.GET_POSTS_LIST_PENDING,
  });

  try {
    const responseGetPosts: AxiosResponse<PostsDataState> = yield call(
      ListAPI.listPosts,
      username
    );

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

function* prefetchPosts(action: FetchPrefetchPosts) {
  const {
    payload: { next },
  } = action;

  try {
    const responsePrefetchPosts: AxiosResponse<PostsDataState> = yield call(
      ListAPI.next,
      next
    );

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

export default function* postsSaga() {
  yield all([fork(watchGetPosts), fork(watchPrefetchPosts)]);
}
