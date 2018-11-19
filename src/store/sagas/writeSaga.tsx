import { takeEvery, fork, put, call, select } from 'redux-saga/effects';
import { WriteActionType, UploadState } from '../modules/write';
import { ErrorActionType } from '../modules/error';
import * as WriteType from './types/write';
import * as FileAPI from '../../lib/api/file';
import { StoreState } from '../modules';

function* createUploadUrlPostThumbnail(action: any) {
  const {
    payload: { file },
  }: WriteType.CreateUploadUrlPostPayload = action;

  try {
    const responseUploadUrl: WriteType.CreateUploadUrlPostResponse = yield call(
      FileAPI.createUrlPost,
      file
    );

    yield put({
      type: WriteActionType.CREATE_UPLOAD_URL_POST_THUMBNAIL_SUCCESS,
      payload: {
        url: responseUploadUrl.data.url,
        path: responseUploadUrl.data.path,
        name: responseUploadUrl.data.name,
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
  }: WriteType.CreateUploadUrlPostPayload = action;

  try {
    const responseUploadUrl: WriteType.CreateUploadUrlPostResponse = yield call(
      FileAPI.createUrlPost,
      file
    );

    yield put({
      type: WriteActionType.CREATE_UPLOAD_URL_POST_IMAGE_SUCCESS,
      payload: {
        url: responseUploadUrl.data.url,
        path: responseUploadUrl.data.path,
        name: responseUploadUrl.data.name,
      },
    });

    const uploadSelect: UploadState = yield select(
      ({ write }: StoreState) => write.upload
    );

    if (!uploadSelect.name || !uploadSelect.url) {
      yield put({
        type: ErrorActionType.ERROR,
        payload: {
          error: true,
          code: 404,
        },
      });
      return;
    }

    const markdownUrl = `${'\n'}![${uploadSelect.name}](${
      uploadSelect.url
    })${'\n'}`;

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

export default function* wrtieSaga() {
  yield [
    fork(watchCreateUploadUrlPostThumbnail),
    fork(watchCreateUploadUrlPostImage),
  ];
}
