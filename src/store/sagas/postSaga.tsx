import { fork, takeEvery, put, call } from 'redux-saga/effects';
import { PostActionType } from '../modules/post';
import { ErrorActionType } from '../modules/error';
import * as PostType from './types/post';
import * as PostAPI from '../../lib/api/post';

function* readPost(action: any) {
  const {
    payload: { postId },
  }: PostType.ReadPostPayload = action;

  try {
    const responseReadPost: PostType.ReadPostResponse = yield call(
      PostAPI.readPost,
      postId
    );

    yield put({
      type: PostActionType.READ_POST_SUCCESS,
      payload: {
        postData: responseReadPost.data,
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

function* like(action: any) {
  const {
    payload: { postId },
  } = action;

  yield put({
    type: PostActionType.LIKE_REQUEST,
  });

  try {
    const responseLike = yield call(PostAPI.like, postId);

    yield put({
      type: PostActionType.LIKE_SUCCESS,
      payload: {
        liked: responseLike.data.liked,
        likes: responseLike.data.likes,
      },
    });
  } catch (e) {
    yield put({
      type: PostActionType.LIKE_ERROR,
    });
  }
}

function* unlike(action: any) {
  const {
    payload: { postId },
  }: PostType.LikePayload = action;

  yield put({
    type: PostActionType.UNLIKE_REQUEST,
  });

  try {
    const responseLike: PostType.LikeResponse = yield call(
      PostAPI.unlike,
      postId
    );

    yield put({
      type: PostActionType.UNLIKE_SUCCESS,
      payload: {
        liked: responseLike.data.liked,
        likes: responseLike.data.likes,
      },
    });
  } catch (e) {
    yield put({
      type: PostActionType.UNLIKE_ERROR,
    });
  }
}

function* watchReadPost() {
  yield takeEvery(PostActionType.READ_POST_REQUEST, readPost);
}

function* watchLike() {
  yield takeEvery(PostActionType.LIKE, like);
}

function* watchUnLike() {
  yield takeEvery(PostActionType.UNLIKE, unlike);
}

export default function* postSaga() {
  yield [fork(watchReadPost), fork(watchLike), fork(watchUnLike)];
}
