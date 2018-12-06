import { fork, put, call, all, takeEvery } from 'redux-saga/effects';
import { FollowActionType } from '../modules/follow';
import * as FollowAPI from '../../lib/api/follow';
import { ErrorActionType } from '../modules/error';
import { Action } from 'redux';
import { AxiosResponse } from 'axios';

export interface FetchFollow extends Action<FollowActionType.FOLLOW_REQUEST> {
  payload: {
    username: string;
  };
}

export interface FetchUnFollow
  extends Action<FollowActionType.UNFOLLOW_REQUEST> {
  payload: {
    username: string;
  };
}

export interface FetchGetFollow
  extends Action<FollowActionType.CHECK_EXISTS_USER_FOLLOW_REQUEST> {
  payload: {
    username: string;
  };
}

export interface FollowState {
  follow: boolean;
}

function* follow(action: FetchFollow) {
  const {
    payload: { username },
  } = action;

  yield put({
    type: FollowActionType.FOLLOW_PENDING,
  });

  try {
    const responseFollow: AxiosResponse<FollowState> = yield call(
      FollowAPI.follow,
      username
    );

    yield put({
      type: FollowActionType.FOLLOW_SUCCESS,
      payload: {
        follow: responseFollow.data.follow,
      },
    });
  } catch (e) {
    yield put({
      type: FollowActionType.FOLLOW_ERROR,
    });
  }
}

function* unfollow(action: FetchUnFollow) {
  const {
    payload: { username },
  } = action;

  yield put({
    type: FollowActionType.UNFOLLOW_PENDING,
  });

  try {
    const responseUnFollow: AxiosResponse<FollowState> = yield call(
      FollowAPI.unfollow,
      username
    );

    yield put({
      type: FollowActionType.UNFOLLOW_SUCCESS,
      payload: {
        follow: responseUnFollow.data.follow,
      },
    });
  } catch (e) {
    yield put({
      type: FollowActionType.UNFOLLOW_ERROR,
    });
  }
}

function* getfollow(action: FetchGetFollow) {
  const {
    payload: { username },
  } = action;

  try {
    const responseGetFollow: AxiosResponse<FollowState> = yield call(
      FollowAPI.getFollow,
      username
    );

    yield put({
      type: FollowActionType.CHECK_EXISTS_USER_FOLLOW_SUCCESS,
      payload: {
        follow: responseGetFollow.data.follow,
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

function* watchGetFollow() {
  yield takeEvery(FollowActionType.CHECK_EXISTS_USER_FOLLOW_REQUEST, getfollow);
}

function* watchFollow() {
  yield takeEvery(FollowActionType.FOLLOW_REQUEST, follow);
}

function* watchUnFollow() {
  yield takeEvery(FollowActionType.UNFOLLOW_REQUEST, unfollow);
}

export default function* followSaga() {
  yield all([fork(watchFollow), fork(watchUnFollow), fork(watchGetFollow)]);
}
