import { handleActions, createAction } from 'redux-actions';
import produce from 'immer';
import * as ListType from '../types/list';

export enum VideosActionType {
  REVEAL_VIDEOS_PREFETCHED = 'list/videos/REVEAL_VIDEOS_PREFETCHED',

  GET_VIDEOS_LIST_REQUEST = 'list/videos/GET_POSTS_LIST_REQUEST',
  GET_VIDEOS_LIST_PENDING = 'list/videos/GET_VIDEOS_LIST_PENDING',
  GET_VIDEOS_LIST_SUCCESS = 'list/videos/GET_VIDEOS_LIST_SUCCESS',

  PREFETCH_VIDEOS_LIST_REQUEST = 'list/videos/PREFETCH_VIDEOS_LIST_REQUEST',
  PREFETCH_VIDEOS_LIST_SUCCESS = 'list/videos/PREFETCH_VIDEOS_LIST_SUCCESS',
}

export const videosCreators = {
  getVideos: createAction(
    VideosActionType.GET_VIDEOS_LIST_REQUEST,
    (payload: ListType.ListVideoPayload) => payload
  ),
  prefetchVideos: createAction(
    VideosActionType.PREFETCH_VIDEOS_LIST_REQUEST,
    (payload: ListType.PrefetchListPayload) => payload
  ),
  revealVideosPrefetched: createAction(
    VideosActionType.REVEAL_VIDEOS_PREFETCHED
  ),
};

export interface VideosSubState {
  videoId: string;
  title: string;
  play_time: string;
  description: string | null;
  category: string;
  video_thumbnail: string;
  video_url: string;
  createdAt: string;
  info: {
    likes: number;
    comments: number;
    views: number;
  };
  user: {
    username: string;
    thumbnail: string;
    shortBio: string;
    _id: string;
  };
}

export interface ListingSetState {
  video: VideosSubState[];
  prefetched: VideosSubState[];
  end: boolean;
  next: string;
  loading: boolean;
}

export interface VideosState {
  videos: ListingSetState;
}

const initialListingSet: ListingSetState = {
  video: [],
  prefetched: [],
  end: false,
  next: '',
  loading: false,
};

const initialState: VideosState = {
  videos: initialListingSet,
};

export default handleActions<VideosState, any>(
  {
    [VideosActionType.REVEAL_VIDEOS_PREFETCHED]: state => {
      return produce(state, draft => {
        const { video, prefetched } = draft.videos;
        if (video && prefetched) {
          video.push(...prefetched);
          draft.videos.prefetched = [];
        }
      });
    },
    [VideosActionType.GET_VIDEOS_LIST_PENDING]: state => {
      return produce(state, draft => {
        draft.videos.loading = true;
      });
    },
    [VideosActionType.GET_VIDEOS_LIST_SUCCESS]: (
      state,
      action: ListType.VideosListAction
    ) => {
      return produce(state, draft => {
        if (action.payload === undefined) return;
        const {
          payload: { videos },
        } = action;
        draft.videos = {
          video: videos.videosWithData,
          prefetched: [],
          end: false,
          next: videos.next,
          loading: false,
        };
      });
    },
    [VideosActionType.PREFETCH_VIDEOS_LIST_SUCCESS]: (
      state,
      action: ListType.VideosListAction
    ) => {
      return produce(state, draft => {
        if (action.payload === undefined) return;
        const {
          payload: { videos },
        } = action;
        draft.videos.prefetched = videos.videosWithData;
        draft.videos.next = videos.next;
        if (videos.videosWithData && videos.videosWithData.length === 0) {
          draft.videos.end = true;
        }
      });
    },
  },
  initialState
);
