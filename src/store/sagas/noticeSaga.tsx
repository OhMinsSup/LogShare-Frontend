import { put, call, takeEvery, fork, all } from 'redux-saga/effects';
import { ErrorActionType } from '../modules/error';
import { NoticeActionType } from '../modules/notice';
import * as NoticeAPI from '../../lib/api/notice';
import { Action } from 'redux';
import { AxiosResponse } from 'axios';
import { MessageSubState } from '../modules/list/notices';

export interface FetchSendMessage
  extends Action<NoticeActionType.SEND_MESSAGE_REQUEST> {
  payload: {
    message: string;
  };
}

export interface FetchCheckNoticeRoom
  extends Action<NoticeActionType.CHECK_NOTICE_ROOM_REQUEST> {
  payload?: any;
}

export interface FetchSimpleNoticeMessage
  extends Action<NoticeActionType.ALREADY_MESSAGE_LIST_REQUEST> {
  payload?: any;
}

export interface NoticeDataState {
  message: MessageSubState[];
}

export interface NoticeRoomDataState {
  noticeWithData: {
    noticeId: string;
    creator: {
      username: string;
      shortBio: string;
      _id: string;
      thumbnail: string;
    };
  };
}

function* sendMessage(action: FetchSendMessage) {
  const {
    payload: { message },
  } = action;
  try {
    yield call(NoticeAPI.sendMessage, message);
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

function* checkNoticeRoom(action: FetchCheckNoticeRoom) {
  try {
    const responseCheckNoticeRoom: AxiosResponse<
      NoticeRoomDataState
    > = yield call(NoticeAPI.checkNotice);

    yield put({
      type: NoticeActionType.CHECK_NOTICE_ROOM_SUCCESS,
      payload: {
        noticeId: responseCheckNoticeRoom.data.noticeWithData.noticeId,
        creator: responseCheckNoticeRoom.data.noticeWithData.creator,
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

function* alreadyNoticeMessage(action: FetchSimpleNoticeMessage) {
  try {
    const responseSimpleNoticeList: AxiosResponse<NoticeDataState> = yield call(
      NoticeAPI.alreadyNoticeMesssage
    );

    yield put({
      type: NoticeActionType.ALREADY_MESSAGE_LIST_SUCCESS,
      payload: {
        notices: responseSimpleNoticeList.data.message,
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

function* watchSendMessage() {
  yield takeEvery(NoticeActionType.SEND_MESSAGE_REQUEST, sendMessage);
}

function* watchAlreadyNoticeMessage() {
  yield takeEvery(
    NoticeActionType.ALREADY_MESSAGE_LIST_REQUEST,
    alreadyNoticeMessage
  );
}

function* watchCheckNoticeRoom() {
  yield takeEvery(NoticeActionType.CHECK_NOTICE_ROOM_REQUEST, checkNoticeRoom);
}

export default function* followsSaga() {
  yield all([
    fork(watchCheckNoticeRoom),
    fork(watchAlreadyNoticeMessage),
    fork(watchSendMessage),
  ]);
}
