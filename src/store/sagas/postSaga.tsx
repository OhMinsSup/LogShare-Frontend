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

function* watchReadPost() {
  yield takeEvery(PostActionType.READ_POST_REQUEST, readPost);
}

export default function* postSaga() {
  yield [fork(watchReadPost)];
}
