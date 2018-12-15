import { takeEvery, fork, put, call, all } from 'redux-saga/effects';
import { Action } from 'redux';
import { VideoActionType, VideoUploadState } from '../modules/video';
import { ErrorActionType } from '../modules/error';
import { BaseActionType } from '../modules/base';
import { AxiosResponse } from 'axios';
import * as FileAPI from '../../lib/api/file';
import * as VideoAPI from '../../lib/api/video';

export interface FetchCreateUploadUrlVideoUpload
  extends Action<VideoActionType.CREATE_UPLOAD_URL_VIDEO_UPLOAD_REQUEST> {
  payload: {
    file: File;
  };
}

export interface FetchCreateUploadUrlVideoThumbnail
  extends Action<VideoActionType.CREATE_UPLOAD_URL_VIDEO_THUMBNAIL_REQUEST> {
  payload: {
    file: File;
  };
}

export interface FetchSubmit extends Action<VideoActionType.SUBMIT_REQUEST> {
  payload: {
    time: string;
    thumbnail: string;
    format: string;
    url: string;
    title: string;
    description: string;
    category: string;
  };
}

export interface SubmitVideoDataState {
  videoId: string;
}

function* createUploadUrlVideoThumbnail(
  action: FetchCreateUploadUrlVideoThumbnail
) {
  const {
    payload: { file },
  } = action;

  yield put({
    type: BaseActionType.PROGRESS_BAR_LODING,
    payload: {
      loding: true,
    },
  });

  try {
    const responseUpload: AxiosResponse<VideoUploadState> = yield call(
      FileAPI.createVideoThumbnail,
      file
    );

    const {
      data: { url, name, path },
    } = responseUpload;

    yield put({
      type: VideoActionType.CREATE_UPLOAD_URL_VIDEO_THUMBNAIL_SUCCESS,
      payload: {
        url,
        name,
        path,
      },
    });

    yield put({
      type: BaseActionType.PROGRESS_BAR_LODING,
      payload: {
        loding: false,
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

function* createUploadUrlVideoUpload(action: FetchCreateUploadUrlVideoUpload) {
  const {
    payload: { file },
  } = action;

  yield put({
    type: BaseActionType.PROGRESS_BAR_LODING,
    payload: {
      loding: true,
    },
  });

  try {
    const responseUpload: AxiosResponse<VideoUploadState> = yield call(
      FileAPI.createVideoUpload,
      file
    );

    const {
      data: { url, name, path, thumbnail, time, format },
    } = responseUpload;

    yield put({
      type: VideoActionType.CREATE_UPLOAD_URL_VIDEO_UPLOAD_SUCCESS,
      payload: {
        url,
        name,
        path,
        thumbnail,
        time,
        format,
      },
    });

    yield put({
      type: BaseActionType.PROGRESS_BAR_LODING,
      payload: {
        loding: false,
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

function* submit(action: FetchSubmit) {
  const {
    payload: { title, thumbnail, description, category, url, format, time },
  } = action;

  try {
    const responseSubmit: AxiosResponse<SubmitVideoDataState> = yield call(
      VideoAPI.createVideo,
      {
        title,
        description,
        category,
        time,
        format,
        video_thumbnail: thumbnail,
        video_url: url,
      }
    );

    const {
      data: { videoId },
    } = responseSubmit;

    yield put({
      type: VideoActionType.SUBMIT_SUCCESS,
      payload: {
        videoId,
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

function* watchSubmit() {
  yield takeEvery(VideoActionType.SUBMIT_REQUEST, submit);
}

function* watchCreateUploadUrlVideoUpload() {
  yield takeEvery(
    VideoActionType.CREATE_UPLOAD_URL_VIDEO_UPLOAD_REQUEST,
    createUploadUrlVideoUpload
  );
}

function* watchCreateUploadUrlVideoThumbnail() {
  yield takeEvery(
    VideoActionType.CREATE_UPLOAD_URL_VIDEO_THUMBNAIL_REQUEST,
    createUploadUrlVideoThumbnail
  );
}

export default function* videoSaga() {
  yield all([
    fork(watchCreateUploadUrlVideoUpload),
    fork(watchCreateUploadUrlVideoThumbnail),
    fork(watchSubmit),
  ]);
}
