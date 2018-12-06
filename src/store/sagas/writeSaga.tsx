import { takeEvery, fork, put, call, select, all } from 'redux-saga/effects';
import { WriteActionType } from '../modules/write';
import { ErrorActionType } from '../modules/error';
import * as FileAPI from '../../lib/api/file';
import * as WriteAPI from '../../lib/api/write';
import { StoreState } from '../modules';
import { Action } from 'redux';
import { History } from 'history';
import { AxiosResponse } from 'axios';
import { PostDataState } from '../modules/post';

export interface FetchCreateUploadUrlPostThumbnail
  extends Action<WriteActionType.CREATE_UPLOAD_URL_POST_THUMBNAIL_REQUEST> {
  payload: {
    file: File;
  };
}

export interface FetchCreateUploadUrlPostImage
  extends Action<WriteActionType.CREATE_UPLOAD_URL_POST_IMAGE_REQUEST> {
  payload: {
    file: File;
  };
}

export interface FetchWriteSubmit
  extends Action<WriteActionType.WRITE_SUBMIT_REQUEST> {
  payload: {
    title: string;
    body: string;
    post_thumbnail: string | null;
    tags: string[];
    history: History;
  };
}

export interface FetchGetPost extends Action<WriteActionType.GET_POST_REQUEST> {
  payload: {
    postId: string;
  };
}

export interface FetchEditPost
  extends Action<WriteActionType.EDIT_SUBMIT_REQUEST> {
  payload: {
    title: string;
    body: string;
    post_thumbnail: string | null;
    tags: string[];
    postId: string;
    history: History;
  };
}

export interface UploadDataState {
  url: string;
  path: string;
  name: string;
}

export interface PostIdDataState {
  postId: string;
}

function* createUploadUrlPostThumbnail(
  action: FetchCreateUploadUrlPostThumbnail
) {
  const {
    payload: { file },
  } = action;

  try {
    const responseUploadUrl: AxiosResponse<UploadDataState> = yield call(
      FileAPI.createUrlPost,
      file
    );

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

function* createUploadUrlPostImage(action: FetchCreateUploadUrlPostImage) {
  const {
    payload: { file },
  } = action;

  try {
    const responseUploadUrl: AxiosResponse<UploadDataState> = yield call(
      FileAPI.createUrlPost,
      file
    );

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

function* writeSubmit(action: FetchWriteSubmit) {
  const {
    payload: { title, body, post_thumbnail, tags, history },
  } = action;

  try {
    const responseWritePost: AxiosResponse<PostIdDataState> = yield call(
      WriteAPI.writePost,
      {
        title,
        body,
        post_thumbnail,
        tags,
      }
    );

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

function* getPost(action: FetchGetPost) {
  const {
    payload: { postId },
  } = action;

  try {
    const responseReadPost: AxiosResponse<PostDataState> = yield call(
      WriteAPI.getPost,
      postId
    );

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

function* editSubmit(action: FetchEditPost) {
  const {
    payload: { title, body, post_thumbnail, tags, postId, history },
  } = action;

  try {
    const responseUpdatePost: AxiosResponse<PostIdDataState> = yield call(
      WriteAPI.updatePost,
      {
        title,
        body,
        post_thumbnail,
        tags,
        postId,
      }
    );

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
