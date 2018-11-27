import { takeEvery, fork, put, call, select, all } from 'redux-saga/effects';
import { WriteActionType } from '../modules/write';
import { ErrorActionType } from '../modules/error';
import * as FileAPI from '../../lib/api/file';
import * as WriteAPI from '../../lib/api/write';
import { StoreState } from '../modules';

function* createUploadUrlPostThumbnail(action: any) {
  const {
    payload: { file },
  } = action;

  try {
    const responseUploadUrl = yield call(FileAPI.createUrlPost, file);

    const {
      data: { url, path, name },
    } = responseUploadUrl;

    yield put({
      type: WriteActionType.CREATE_UPLOAD_URL_POST_THUMBNAIL_SUCCESS,
      payload: {
        url,
        path,
        name,
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

function* createUploadUrlPostImage(action: any) {
  const {
    payload: { file },
  } = action;

  try {
    const responseUploadUrl = yield call(FileAPI.createUrlPost, file);

    const {
      data: { url, path, name },
    } = responseUploadUrl;

    if (!url || !name || !path) {
      yield put({
        type: ErrorActionType.ERROR,
        payload: {
          error: true,
          code: 404,
        },
      });
      return;
    }

    const markdownUrl = `${'\n'}![${name}](${url})${'\n'}`;

    yield put({
      type: WriteActionType.SET_INSERT_TEXT,
      payload: {
        text: markdownUrl,
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

function* writeSubmit(action: any) {
  const {
    payload: { title, body, post_thumbnail, tags, history },
  } = action;

  try {
    const responseWritePost = yield call(WriteAPI.writePost, {
      title,
      body,
      post_thumbnail,
      tags,
    });

    yield put({
      type: WriteActionType.WRITE_SUBMIT_SUCCESS,
      payload: {
        postId: responseWritePost.data.postId,
      },
    });

    const postIdSelect: string | null = yield select(
      ({ write }: StoreState) => write.postId
    );

    if (!postIdSelect) {
      yield put({
        type: ErrorActionType.ERROR,
        payload: {
          error: true,
          code: 404,
        },
      });
      return;
    }

    history.push(`/post/${postIdSelect}`);
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

function* getPost(action: any) {
  const {
    payload: { postId },
  } = action;

  try {
    const responseReadPost = yield call(WriteAPI.getPost, postId);

    yield put({
      type: WriteActionType.GET_POST_SUCCESS,
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

function* editSubmit(action: any) {
  const {
    payload: { title, body, post_thumbnail, tags, postId, history },
  } = action;

  try {
    const responseUpdatePost = yield call(WriteAPI.updatePost, {
      title,
      body,
      post_thumbnail,
      tags,
      postId,
    });

    yield put({
      type: WriteActionType.EDIT_SUBMIT_SUCCESS,
      payload: {
        postId: responseUpdatePost.data.postId,
      },
    });

    const postIdSelect: string | null = yield select(
      ({ write }: StoreState) => write.postId
    );

    if (!postIdSelect) {
      yield put({
        type: ErrorActionType.ERROR,
        payload: {
          error: true,
          code: 404,
        },
      });
      return;
    }

    history.push(`/post/${postIdSelect}`);
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

function* watchEditSubmit() {
  yield takeEvery(WriteActionType.EDIT_SUBMIT_REQUEST, editSubmit);
}

function* watchWriteSubmit() {
  yield takeEvery(WriteActionType.WRITE_SUBMIT_REQUEST, writeSubmit);
}

function* watchCreateUploadUrlPostThumbnail() {
  yield takeEvery(
    WriteActionType.CREATE_UPLOAD_URL_POST_THUMBNAIL_REQUEST,
    createUploadUrlPostThumbnail
  );
}

function* watchCreateUploadUrlPostImage() {
  yield takeEvery(
    WriteActionType.CREATE_UPLOAD_URL_POST_IMAGE_REQUEST,
    createUploadUrlPostImage
  );
}

function* watchGetPost() {
  yield takeEvery(WriteActionType.GET_POST_REQUEST, getPost);
}

export default function* wrtieSaga() {
  yield all([
    fork(watchCreateUploadUrlPostThumbnail),
    fork(watchCreateUploadUrlPostImage),
    fork(watchWriteSubmit),
    fork(watchGetPost),
    fork(watchEditSubmit),
  ]);
}
