import { put, call, takeEvery, fork, all } from 'redux-saga/effects';
import { ErrorActionType } from '../modules/error';
import * as ListAPI from '../../lib/api/list';
import { Action } from 'redux';
import { AxiosResponse } from 'axios';
import { UserPostsActionType, PostsSubState } from '../modules/list/userPosts';

export interface FetchGetPosts
  extends Action<UserPostsActionType.GET_USER_POSTS_LIST_REQUEST> {
  payload: {
    username: string;
  };
}

export interface FetchPrefetchPosts
  extends Action<UserPostsActionType.PREFETCH_USER_POSTS_LIST_REQUEST> {
  payload: {
    next: string;
  };
}

export interface PostsDataState {
  postWithData: PostsSubState[];
  next: string;
}

function* getUserPosts(action: FetchGetPosts) {
  const {
    payload: { username },
  } = action;
  yield put({
    type: UserPostsActionType.GET_USER_POSTS_LIST_PENDING,
  });

  try {
    const responseGetPosts: AxiosResponse<PostsDataState> = yield call(
      ListAPI.listPosts,
      username
    );

    yield put({
      type: UserPostsActionType.GET_USER_POSTS_LIST_SUCCESS,
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

function* prefetchUserPosts(action: FetchPrefetchPosts) {
  const {
    payload: { next },
  } = action;

  try {
    const responsePrefetchPosts: AxiosResponse<PostsDataState> = yield call(
      ListAPI.next,
      next
    );

    yield put({
      type: UserPostsActionType.PREFETCH_USER_POSTS_LIST_SUCCESS,
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

function* watchGetUserPosts() {
  yield takeEvery(
    UserPostsActionType.GET_USER_POSTS_LIST_REQUEST,
    getUserPosts
  );
}

function* watchPrefetchUserPosts() {
  yield takeEvery(
    UserPostsActionType.PREFETCH_USER_POSTS_LIST_REQUEST,
    prefetchUserPosts
  );
}

export default function* postsSaga() {
  yield all([fork(watchGetUserPosts), fork(watchPrefetchUserPosts)]);
}
