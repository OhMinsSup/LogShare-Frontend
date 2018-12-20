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

  SIDE_VIDEOS_REQUEST = 'video/SIDE_VIDEOS_REQUEST',
  SIDE_VIDEOS_PENDING = 'video/SIDE_VIDEOS_PENDING',
  SIDE_VIDEOS_SUCCESS = 'video/SIDE_VIDEOS_SUCCESS',

  GET_VIDEO_REQUEST = 'video/GET_VIDEO_REQUEST',
  GET_VIDEO_PENDING = 'video/GET_VIDEO_PENDING',
  GET_VIDEO_SUCCESS = 'video/GET_VIDEO_SUCCESS',
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
  sideVideos: createAction(VideoActionType.SIDE_VIDEOS_REQUEST),
  getVideo: createAction(
    VideoActionType.GET_VIDEO_REQUEST,
    (payload: VideoType.GetVideoPayload) => payload
  ),
};

export interface SideVideoState {
  videoId: string;
  video_thumbnail: string;
  video_url: string;
  title: string;
  description: string | null;
  category: string;
  play_time: string;
  format: string;
  info: {
    views: number;
    score: number;
    likes: number;
    comments: number;
  };
  createdAt: string;
  profile: {
    thumbnail: string;
    shortBio: string;
    cover: string;
    username: string;
  };
}

export interface MainVideoState {
  videoId: string;
  video_thumbnail: string;
  video_url: string;
  title: string;
  description: string | null;
  category: string;
  play_time: string;
  liked: boolean;
  format: string;
  info: {
    views: number;
    score: number;
    likes: number;
    comments: number;
  };
  createdAt: string;
  user: {
    thumbnail: string;
    shortBio: string;
    cover: string;
    username: string;
  };
}

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
  side_loading: boolean;
  main_loading: boolean;
  thumbnail: VideoUploadState;
  video: VideoUploadState;
  side_videos: SideVideoState[];
  main_video: MainVideoState;
}

const initialState: VideoState = {
  videoId: '',
  side_loading: false,
  main_loading: false,
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
  side_videos: [],
  main_video: {
    videoId: '',
    video_thumbnail: '',
    video_url: '',
    title: '',
    description: '',
    category: '',
    play_time: '',
    liked: false,
    format: '',
    info: {
      views: 0,
      score: 0,
      likes: 0,
      comments: 0,
    },
    createdAt: '',
    user: {
      thumbnail: '',
      shortBio: '',
      cover: '',
      username: '',
    },
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
        draft.thumbnail = {
          path: '',
          name: '',
          url: '',
        };
        draft.video = {
          path: '',
          name: '',
          url: '',
          thumbnail: '',
          time: '',
          format: '',
        };
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
    [VideoActionType.SIDE_VIDEOS_SUCCESS]: (
      state,
      action: VideoType.SideVideosAction
    ) => {
      return produce(state, draft => {
        if (action.payload === undefined) return;
        const {
          payload: { videosWithData },
        } = action;
        draft.side_videos = videosWithData;
        draft.side_loading = false;
      });
    },
    [VideoActionType.SIDE_VIDEOS_PENDING]: state => {
      return produce(state, draft => {
        draft.side_loading = true;
      });
    },
    [VideoActionType.GET_VIDEO_SUCCESS]: (
      state,
      action: VideoType.MainVideoAction
    ) => {
      return produce(state, draft => {
        if (action.payload === undefined) return;
        const {
          payload: { video },
        } = action;
        draft.main_video = video;
      });
    },
  },
  initialState
);
