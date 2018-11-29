import { put, call, takeEvery, fork, all } from 'redux-saga/effects';
import { FollowsActionType } from '../modules/list/follows';
import { ErrorActionType } from '../modules/error';
import * as ListAPI from '../../lib/api/list';

function* getFollowing(action: any) {
  const {
    payload: { username },
  } = action;

  yield put({
    type: FollowsActionType.GET_FOLLOW_USERS_LIST_PENDING,
  });

  try {
    const responseGetFollowingUsers = yield call(
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

function* getFollower(action: any) {
  const {
    payload: { username },
  } = action;

  yield put({
    type: FollowsActionType.GET_FOLLOW_USERS_LIST_PENDING,
  });

  try {
    const responseGetFollowerUsers = yield call(
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

function* prefetchUsers(action: any) {
  const {
    payload: { next },
  } = action;

  try {
    const responsePrefetchUsers = yield call(ListAPI.next, next);

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
