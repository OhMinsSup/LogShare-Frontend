import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import * as ListType from '../types/list';

export enum NoticesActionType {
  REVEAL_NOTICES_PREFETCHED = 'list/notices/REVEAL_NOTICES_PREFETCHED',

  GET_NOTICES_LIST_REQUEST = 'list/notices/GET_NOTICES_LIST_REQUEST',
  GET_NOTICES_LIST_PENDING = 'list/notices/GET_NOTICES_LIST_PENDING',
  GET_NOTICES_LIST_SUCCESS = 'list/notices/GET_NOTICES_LIST_SUCCESS',

  PREFETCH_NOTICES_LIST_REQUEST = 'list/notices/PREFETCH_NOTICES_LIST_REQUEST',
  PREFETCH_NOTICES_LIST_SUCCESS = 'list/notices/PREFETCH_NOTICES_LIST_SUCCESS',
}

export const noticesCreators = {
  getNotices: createAction(NoticesActionType.GET_NOTICES_LIST_REQUEST),
  prefetchNotices: createAction(
    NoticesActionType.PREFETCH_NOTICES_LIST_REQUEST,
    (payload: ListType.PrefetchListPayload) => payload
  ),
  revealNoticesPrefetched: createAction(
    NoticesActionType.REVEAL_NOTICES_PREFETCHED
  ),
};

export interface MessageSubState {
  message: string;
  username: string;
  thumbnail: string;
  createdAt: string;
}

export interface ListingSetState {
  message: MessageSubState[];
  prefetched: MessageSubState[];
  end: boolean;
  next: string;
  loading: boolean;
}

export interface NoticesState {
  notices: ListingSetState;
}

const initialListingSet: ListingSetState = {
  message: [],
  prefetched: [],
  end: false,
  next: '',
  loading: false,
};

const initialState: NoticesState = {
  notices: initialListingSet,
};

export default handleActions<NoticesState, any>(
  {
    [NoticesActionType.REVEAL_NOTICES_PREFETCHED]: state => {
      return produce(state, draft => {
        const { message, prefetched } = draft.notices;
        if (message && prefetched) {
          message.push(...prefetched);
          draft.notices.prefetched = [];
        }
      });
    },
    [NoticesActionType.GET_NOTICES_LIST_PENDING]: state => {
      return produce(state, draft => {
        draft.notices.loading = true;
      });
    },
    [NoticesActionType.GET_NOTICES_LIST_SUCCESS]: (
      state,
      action: ListType.NoticesListAction
    ) => {
      return produce(state, draft => {
        if (action.payload === undefined) return;
        const {
          payload: { message, next },
        } = action;
        draft.notices = {
          message: message,
          prefetched: [],
          end: false,
          next: next,
          loading: false,
        };
      });
    },
    [NoticesActionType.PREFETCH_NOTICES_LIST_SUCCESS]: (
      state,
      action: ListType.NoticesListAction
    ) => {
      return produce(state, draft => {
        if (action.payload === undefined) return;
        const {
          payload: { message, next },
        } = action;
        draft.notices.prefetched = message;
        draft.notices.next = next;
        if (message && message.length === 0) {
          draft.notices.end = true;
        }
      });
    },
  },
  initialState
);
