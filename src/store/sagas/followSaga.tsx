import { fork, put, call, all, takeEvery } from 'redux-saga/effects';
import { FollowActionType } from '../modules/follow';
import * as FollowAPI from '../../lib/api/follow';
import { ErrorActionType } from '../modules/error';

function* follow(action: any) {
  const {
    payload: { username },
  } = action;

  yield put({
    type: FollowActionType.FOLLOW_PENDING,
  });

  try {
    const responseFollow = yield call(FollowAPI.follow, username);

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

function* unfollow(action: any) {
  const {
    payload: { username },
  } = action;

  yield put({
    type: FollowActionType.UNFOLLOW_PENDING,
  });

  try {
    const responseUnFollow = yield call(FollowAPI.unfollow, username);

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

function* getfollow(action: any) {
  const {
    payload: { username },
  } = action;

  try {
    const responseGetFollow = yield call(FollowAPI.getFollow, username);

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
