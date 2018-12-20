import { takeEvery, fork, put, call, all } from 'redux-saga/effects';
import { Action } from 'redux';
import {
  VideoActionType,
  VideoUploadState,
  SideVideoState,
  MainVideoState,
} from '../modules/video';
import { ErrorActionType } from '../modules/error';
import { BaseActionType } from '../modules/base';
import { AxiosResponse } from 'axios';
import * as FileAPI from '../../lib/api/file';
import * as ListAPI from '../../lib/api/list';
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

export interface FetchSideVideos
  extends Action<VideoActionType.SIDE_VIDEOS_REQUEST> {
  payload?: any;
}

export interface FetchGetVideo
  extends Action<VideoActionType.GET_VIDEO_REQUEST> {
  payload: {
    videoId: string;
  };
}

export interface SubmitVideoDataState {
  videoId: string;
}

export interface SideVideosDataState {
  videosWithData: SideVideoState[];
}

function* getVideo(action: FetchGetVideo) {
  const {
    payload: { videoId },
  } = action;

  yield put({
    type: VideoActionType.GET_VIDEO_PENDING,
  });

  try {
    const responseGetVideo: AxiosResponse<MainVideoState> = yield call(
      VideoAPI.getVideo,
      videoId
    );

    const { data } = responseGetVideo;

    yield put({
      type: VideoActionType.GET_VIDEO_SUCCESS,
      payload: {
        video: data,
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

function* sideVideos(action: FetchSideVideos) {
  yield put({
    type: VideoActionType.SIDE_VIDEOS_PENDING,
  });

  try {
    const responseSideVideo: AxiosResponse<SideVideosDataState> = yield call(
      ListAPI.sideVideos
    );

    const {
      data: { videosWithData },
    } = responseSideVideo;

    yield put({
      type: VideoActionType.SIDE_VIDEOS_SUCCESS,
      payload: {
        videosWithData,
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

function* watchGetVideo() {
  yield takeEvery(VideoActionType.GET_VIDEO_REQUEST, getVideo);
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

function* watchSideVideos() {
  yield takeEvery(VideoActionType.SIDE_VIDEOS_REQUEST, sideVideos);
}

export default function* videoSaga() {
  yield all([
    fork(watchCreateUploadUrlVideoUpload),
    fork(watchCreateUploadUrlVideoThumbnail),
    fork(watchSubmit),
    fork(watchSideVideos),
    fork(watchGetVideo),
  ]);
}
