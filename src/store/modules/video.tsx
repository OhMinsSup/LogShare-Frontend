import { handleActions, createAction } from 'redux-actions';
import * as VideoType from './types/video';
import produce from 'immer';

export enum VideoActionType {
  SUBMIT_REQUEST = 'video/SUBMIT_REQUEST',
  SUBMIT_SUCCESS = 'video/SUBMIT_SUCCESS',

  CREATE_UPLOAD_URL_VIDEO_UPLOAD_REQUEST = 'video/CREATE_UPLOAD_URL_VIDEO_UPLOAD_REQUEST',
  CREATE_UPLOAD_URL_VIDEO_UPLOAD_SUCCESS = 'video/CREATE_UPLOAD_URL_VIDEO_UPLOAD_SUCCESS',
  CREATE_UPLOAD_URL_VIDEO_THUMBNAIL_REQUEST = 'video/CREATE_UPLOAD_URL_VIDEO_THUMBNAIL_REQUEST',
  CREATE_UPLOAD_URL_VIDEO_THUMBNAIL_SUCCESS = 'video/CREATE_UPLOAD_URL_VIDEO_THUMBNAIL_SUCCESS',
}

export const videoCreators = {
  createUploadUrlVideoUpload: createAction(
    VideoActionType.CREATE_UPLOAD_URL_VIDEO_UPLOAD_REQUEST,
    (payload: VideoType.CreateUploadUrlVideoPayload) => payload
  ),
  createUploadUrlVideoThumbnail: createAction(
    VideoActionType.CREATE_UPLOAD_URL_VIDEO_THUMBNAIL_REQUEST,
    (payload: VideoType.CreateUploadUrlVideoPayload) => payload
  ),
  submit: createAction(
    VideoActionType.SUBMIT_REQUEST,
    (payload: VideoType.SubmitPayload) => payload
  ),
};

export interface VideoUploadState {
  path: string;
  name: string;
  url: string;
  thumbnail?: string;
  time?: string;
  format?: string;
}

export interface VideoState {
  videoId: string;
  thumbnail: VideoUploadState;
  video: VideoUploadState;
}

const initialState: VideoState = {
  videoId: '',
  thumbnail: {
    path: '',
    name: '',
    url: '',
  },
  video: {
    path: '',
    name: '',
    url: '',
    thumbnail: '',
    time: '',
    format: '',
  },
};

export default handleActions<VideoState, any>(
  {
    [VideoActionType.SUBMIT_SUCCESS]: (
      state,
      action: VideoType.SubmitVideoAction
    ) => {
      return produce(state, draft => {
        if (action.payload === undefined) return;
        const {
          payload: { videoId },
        } = action;
        draft.videoId = videoId;
      });
    },
    [VideoActionType.CREATE_UPLOAD_URL_VIDEO_UPLOAD_SUCCESS]: (
      state,
      action: VideoType.CreateUploadUrlVideoAction
    ) => {
      return produce(state, draft => {
        if (action.payload === undefined) return;
        const {
          payload: { url, name, path, thumbnail, time, format },
        } = action;
        draft.video = {
          path,
          name,
          url,
          thumbnail,
          time,
          format,
        };
      });
    },
    [VideoActionType.CREATE_UPLOAD_URL_VIDEO_THUMBNAIL_SUCCESS]: (
      state,
      action: VideoType.CreateUploadUrlVideoAction
    ) => {
      return produce(state, draft => {
        if (action.payload === undefined) return;
        const {
          payload: { url, name, path },
        } = action;
        draft.thumbnail = {
          path,
          name,
          url,
        };
      });
    },
  },
  initialState
);
