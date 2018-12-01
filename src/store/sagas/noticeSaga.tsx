import { put, call, takeEvery, fork, all } from 'redux-saga/effects';
import { ErrorActionType } from '../modules/error';
import { NoticeActionType } from '../modules/notice';
import * as NoticeAPI from '../../lib/api/notice';

function* sendMessage(action: any) {
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

function* checkNoticeRoom(action: any) {
  try {
    const responseCheckNoticeRoom = yield call(NoticeAPI.checkNotice);

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

function* simpleNoticeMessage(action: any) {
  try {
    const responseSimpleNoticeList = yield call(NoticeAPI.simpleNoticeMesssage);

    yield put({
      type: NoticeActionType.SIMPLE_MESSAGE_LIST_SUCCESS,
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

function* watchSimpleNoticeMessage() {
  yield takeEvery(
    NoticeActionType.SIMPLE_MESSAGE_LIST_REQUEST,
    simpleNoticeMessage
  );
}

function* watchCheckNoticeRoom() {
  yield takeEvery(NoticeActionType.CHECK_NOTICE_ROOM_REQUEST, checkNoticeRoom);
}

export default function* followsSaga() {
  yield all([
    fork(watchCheckNoticeRoom),
    fork(watchSimpleNoticeMessage),
    fork(watchSendMessage),
  ]);
}
