import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import * as NoticeType from './types/notice';

export enum NoticeActionType {
  ALREADY_MESSAGE_LIST_REQUEST = 'notice/ALREADY_MESSAGE_LIST_REQUEST',
  ALREADY_MESSAGE_LIST_SUCCESS = 'notice/ALREADY_MESSAGE_LIST_SUCCESS',

  SEND_MESSAGE_REQUEST = 'notice/SEND_MESSAGE_REQUEST',

  CHECK_NOTICE_ROOM_REQUEST = 'notice/CHECK_NOTICE_ROOM_REQUEST',
  CHECK_NOTICE_ROOM_SUCCESS = 'notice/CHECK_NOTICE_ROOM_SUCCESS',

  SET_NOTICE_ROOM = 'notice/SET_NOTICE_ROOM',
}

export const noticeCreators = {
  sendMessage: createAction(
    NoticeActionType.SEND_MESSAGE_REQUEST,
    (payload: NoticeType.SendMessagePayload) => payload
  ),
  alreadyMessageList: createAction(
    NoticeActionType.ALREADY_MESSAGE_LIST_REQUEST
  ),
  checkNoticeRoom: createAction(NoticeActionType.CHECK_NOTICE_ROOM_REQUEST),
  setNoticeRoom: createAction(
    NoticeActionType.SET_NOTICE_ROOM,
    (visible: boolean) => visible
  ),
};

export interface NoticeDataState {
  noticeId: string;
  username: string;
  thumbnail: string;
  shortBio: string;
  _id: string;
}

export interface NoticeMessageState {
  message: string;
  thumbnail: string;
  username: string;
  createdAt: string;
}

export interface NoticeState {
  noticeMessage: NoticeMessageState[];
  noticeData: NoticeDataState | null;
  notice_modal: {
    visible: boolean;
  };
}

const initialState: NoticeState = {
  noticeMessage: [],
  noticeData: null,
  notice_modal: {
    visible: false,
  },
};

export default handleActions<NoticeState, any>(
  {
    [NoticeActionType.SET_NOTICE_ROOM]: (
      state,
      action: NoticeType.SetNoticeRoomAction
    ) => {
      return produce(state, draft => {
        if (action.payload === undefined) return;
        draft.notice_modal.visible = action.payload;
      });
    },
    [NoticeActionType.CHECK_NOTICE_ROOM_SUCCESS]: (
      state,
      action: NoticeType.CheckNoticeRoomAction
    ) => {
      return produce(state, draft => {
        if (action.payload === undefined) return;
        const {
          payload: {
            noticeId,
            creator: { username, shortBio, _id, thumbnail },
          },
        } = action;
        draft.noticeData = {
          noticeId: noticeId,
          username: username,
          shortBio: shortBio,
          _id: _id,
          thumbnail: thumbnail,
        };
      });
    },
    [NoticeActionType.ALREADY_MESSAGE_LIST_SUCCESS]: (
      state,
      action: NoticeType.SimpleNoticeMessageAction
    ) => {
      return produce(state, draft => {
        if (action.payload === undefined) return;

        const {
          payload: { notices },
        } = action;

        draft.noticeMessage = notices;
      });
    },
  },
  initialState
);
