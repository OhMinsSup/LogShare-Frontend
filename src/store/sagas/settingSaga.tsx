import { put, call, takeEvery, fork, all } from 'redux-saga/effects';
import { Action } from 'redux';
import { SettingActionType, ProfileState } from '../modules/setting';
import { ErrorActionType } from '../modules/error';
import * as SettingAPI from '../../lib/api/setting';
import { AxiosResponse } from 'axios';

export interface FetchGetProfileInfo
  extends Action<SettingActionType.GET_PROFILE_INFO_REQUEST> {
  payload?: any;
}

export interface FetchUpdateProfileLinks
  extends Action<SettingActionType.UPDATE_PROFILE_LINKES_REQUEST> {
  payload: {
    github: string;
    twitter: string;
    facebook: string;
  };
}

export interface FetchUpdateEmailPermissions
  extends Action<SettingActionType.UPDATE_EMAIL_PERMISSIONS_REQUEST> {
  payload: {
    email_promotion: boolean;
  };
}

export interface GetProfileInfoDataState {
  profile: ProfileState;
}

export interface UpdateProfileLinksDataState {
  github: string;
  twiiter: string;
  facebook: string;
}

function* updateEmailPermissions(action: FetchUpdateEmailPermissions) {
  const {
    payload: { email_promotion },
  } = action;

  try {
    const responseEmailPermissions = yield call(
      SettingAPI.updateEmailPermissions,
      email_promotion
    );

    yield put({
      type: SettingActionType.UPDATE_EMAIL_PERMISSIONS_SUCCESS,
      payload: {
        email_promotion: responseEmailPermissions.data,
        askSetting: responseEmailPermissions.status === 200 ? true : false,
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

function* updateProfileLinks(action: FetchUpdateProfileLinks) {
  const {
    payload: { github, twitter, facebook },
  } = action;

  try {
    const responseProfileLinks: AxiosResponse<
      UpdateProfileLinksDataState
    > = yield call(SettingAPI.updateProfileLinks, {
      github,
      facebook,
      twitter,
    });

    yield put({
      type: SettingActionType.UPDATE_PROFILE_LINKES_SUCCESS,
      payload: {
        profile_linkes: responseProfileLinks.data,
        askSetting: responseProfileLinks.status === 200 ? true : false,
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

function* getProfileInfo(action: FetchGetProfileInfo) {
  try {
    const responseGetProfileInfo: AxiosResponse<
      GetProfileInfoDataState
    > = yield call(SettingAPI.getProfileInfo);

    yield put({
      type: SettingActionType.GET_PROFILE_INFO_SUCCESS,
      payload: {
        profile: responseGetProfileInfo.data.profile,
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

function* watchGetProfileInfo() {
  yield takeEvery(SettingActionType.GET_PROFILE_INFO_REQUEST, getProfileInfo);
}

function* watchUpdateProfileLinks() {
  yield takeEvery(
    SettingActionType.UPDATE_PROFILE_LINKES_REQUEST,
    updateProfileLinks
  );
}

function* watchUpdateEmailPermissions() {
  yield takeEvery(
    SettingActionType.UPDATE_EMAIL_PERMISSIONS_REQUEST,
    updateEmailPermissions
  );
}

export default function* settingSaga() {
  yield all([
    fork(watchGetProfileInfo),
    fork(watchUpdateProfileLinks),
    fork(watchUpdateEmailPermissions),
  ]);
}
