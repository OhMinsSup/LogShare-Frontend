import { put, call, takeEvery, fork, all } from 'redux-saga/effects';
import {
  FeaturedActionType,
  FeaturedPostsSubState,
  FeaturedUsersSubState,
} from '../modules/list/featured';
import { ErrorActionType } from '../modules/error';
import * as ListAPI from '../../lib/api/list';
import { Action } from 'redux';
import { AxiosResponse } from 'axios';

export interface FetchGetFeaturedPosts
  extends Action<FeaturedActionType.GET_FEATURED_POSTS_LIST_REQUEST> {
  payload?: any;
}

export interface FetchGetFeaturedUsers
  extends Action<FeaturedActionType.GET_FEATURED_USERS_LIST_REQUEST> {
  payload?: any;
}

export interface PostsDataState {
  posts: FeaturedPostsSubState[];
}

export interface UsersDataState {
  users: FeaturedUsersSubState[];
}

function* getFeaturedPosts(action: FetchGetFeaturedPosts) {
  yield put({
    type: FeaturedActionType.GET_FEATURED_POSTS_LIST_PENDING,
  });

  try {
    const responseGetFeaturedPosts: AxiosResponse<PostsDataState> = yield call(
      ListAPI.featuredPost
    );

    yield put({
      type: FeaturedActionType.GET_FEATURED_POSTS_LIST_SUCCESS,
      payload: {
        posts: responseGetFeaturedPosts.data.posts,
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

function* getFeaturedUsers(action: FetchGetFeaturedUsers) {
  yield put({
    type: FeaturedActionType.GET_FEATURED_USERS_LIST_PENDING,
  });

  try {
    const responseGetFeaturedUsers: AxiosResponse<UsersDataState> = yield call(
      ListAPI.featuredUser
    );

    yield put({
      type: FeaturedActionType.GET_FEATURED_USERS_LIST_SUCCESS,
      payload: {
        users: responseGetFeaturedUsers.data.users,
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

function* watchGetFeaturedPosts() {
  yield takeEvery(
    FeaturedActionType.GET_FEATURED_POSTS_LIST_REQUEST,
    getFeaturedPosts
  );
}

function* watchGetFeaturedUsers() {
  yield takeEvery(
    FeaturedActionType.GET_FEATURED_USERS_LIST_REQUEST,
    getFeaturedUsers
  );
}

export default function* featuredSaga() {
  yield all([fork(watchGetFeaturedPosts), fork(watchGetFeaturedUsers)]);
}
