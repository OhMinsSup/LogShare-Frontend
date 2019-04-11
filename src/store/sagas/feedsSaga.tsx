import { put, call, takeEvery, fork, all } from 'redux-saga/effects';
import { ErrorActionType } from '../modules/error';
import { Action } from 'redux';
import { FeedsActionType } from '../modules/list/feeds';
import * as FeedAPI from '../../lib/api/feed';

export interface FetchFeedsPost
  extends Action<FeedsActionType.GET_FEEDS_POST_LIST_REQUEST> {}

function* feedPosts(action: FetchFeedsPost) {
  try {
    const feed = yield call(FeedAPI.feedPosts);
    yield put({
      type: FeedsActionType.GET_FEEDS_POST_LIST_SUCCESS,
      payload: {
        posts: feed.data.feed,
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

export interface FetchFeedsUser
  extends Action<FeedsActionType.GET_FEEDS_USER_LIST_REQUEST> {}

function* feedUsers(action: FetchFeedsUser) {
  try {
    const feed = yield call(FeedAPI.feedUsers);
    yield put({
      type: FeedsActionType.GET_FEEDS_USER_LIST_SUCCESS,
      payload: {
        users: feed.data.feed,
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

function* watchFeedPosts() {
  yield takeEvery(FeedsActionType.GET_FEEDS_POST_LIST_REQUEST, feedPosts);
}

function* watchFeedUsers() {
  yield takeEvery(FeedsActionType.GET_FEEDS_USER_LIST_REQUEST, feedUsers);
}

export default function* feedsSaga() {
  yield all([fork(watchFeedPosts), fork(watchFeedUsers)]);
}
