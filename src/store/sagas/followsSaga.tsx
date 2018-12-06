import { put, call, takeEvery, fork, all } from 'redux-saga/effects';
import { FollowsActionType } from '../modules/list/follows';
import { ErrorActionType } from '../modules/error';
import * as ListAPI from '../../lib/api/list';
import { Action } from 'redux';
import { AxiosResponse } from 'axios';
import { UserSubState } from '../modules/user';

export interface FetchGetFollowing
  extends Action<FollowsActionType.GET_FOLLOWING_USERS_LIST_REQUEST> {
  payload: {
    username: string;
  };
}

export interface FetchGetFollower
  extends Action<FollowsActionType.GET_FOLLOWER_USERS_LIST_REQUEST> {
  payload: {
    username: string;
  };
}

export interface FetchPrefetchUsers
  extends Action<FollowsActionType.PREFETCH_FOLLOWS_LIST_REQUEST> {
  payload: {
    next: string;
  };
}

export interface UsersDataState {
  usersWithData: UserSubState[];
  next: string;
}

function* getFollowing(action: FetchGetFollowing) {
  const {
    payload: { username },
  } = action;

  yield put({
    type: FollowsActionType.GET_FOLLOW_USERS_LIST_PENDING,
  });

  try {
    const responseGetFollowingUsers: AxiosResponse<UsersDataState> = yield call(
      ListAPI.followingUsers,
      username
    );

    yield put({
      type: FollowsActionType.GET_FOLLOW_USERS_LIST_SUCCESS,
      payload: {
        users: responseGetFollowingUsers.data,
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

function* getFollower(action: FetchGetFollower) {
  const {
    payload: { username },
  } = action;

  yield put({
    type: FollowsActionType.GET_FOLLOW_USERS_LIST_PENDING,
  });

  try {
    const responseGetFollowerUsers: AxiosResponse<UsersDataState> = yield call(
      ListAPI.followerUsers,
      username
    );

    yield put({
      type: FollowsActionType.GET_FOLLOW_USERS_LIST_SUCCESS,
      payload: {
        users: responseGetFollowerUsers.data,
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

function* prefetchUsers(action: FetchPrefetchUsers) {
  const {
    payload: { next },
  } = action;

  try {
    const responsePrefetchUsers: AxiosResponse<any> = yield call(
      ListAPI.next,
      next
    );

    yield put({
      type: FollowsActionType.PREFETCH_FOLLOWS_LIST_SUCCESS,
      payload: {
        users: responsePrefetchUsers.data,
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

function* watchPrefetchUsers() {
  yield takeEvery(
    FollowsActionType.PREFETCH_FOLLOWS_LIST_SUCCESS,
    prefetchUsers
  );
}

function* watchGetFollowing() {
  yield takeEvery(
    FollowsActionType.GET_FOLLOWING_USERS_LIST_REQUEST,
    getFollowing
  );
}

function* watchGetFollower() {
  yield takeEvery(
    FollowsActionType.GET_FOLLOWER_USERS_LIST_REQUEST,
    getFollower
  );
}

export default function* followsSaga() {
  yield all([
    fork(watchGetFollowing),
    fork(watchGetFollower),
    fork(watchPrefetchUsers),
  ]);
}
