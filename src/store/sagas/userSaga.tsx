import { fork, put, take, call, all, takeEvery } from 'redux-saga/effects';
import { UserActionType, UserProfileState } from '../modules/user';
import storage from 'src/lib/storage';
import * as AuthAPI from '../../lib/api/auth';
import * as UserAPI from '../../lib/api/user';
import * as FileAPI from '../../lib/api/file';
import { ErrorActionType } from '../modules/error';
import { Action } from 'redux';
import { AuthResultState } from '../modules/auth';
import { AxiosResponse } from 'axios';

export interface FetchCreateUploadUrlCommonUserThumbnail
  extends Action<
    UserActionType.CREATE_UPLOAD_URL_COMMON_USER_THUMBNAIL_REQUEST
  > {
  payload: {
    file: File;
  };
}

export interface FetchCreateUploadUrlCoverBackGround
  extends Action<UserActionType.CREATE_UPLOAD_URL_COVER_BACKGROUND_REQUEST> {
  payload: {
    file: File;
  };
}

export interface FetchGetUserProfileInfo
  extends Action<UserActionType.GET_USER_PROFILE_INFO_REQUEST> {
  payload: {
    username: string;
  };
}

export interface FetchEditProfile
  extends Action<UserActionType.EDIT_PROFILE_SUBMIT_REQUEST> {
  payload: {
    username: string;
    thumbnail: string;
    cover: string;
    shortBio: string;
  };
}

export interface FetchAuthResult {
  payload: {
    authResult: AuthResultState;
  };
}

export interface UploadDataState {
  url: string;
  path: string;
  name: string;
}

export interface ProfileDataState {
  profile: UserProfileState;
}

function* createUploadUrlCommonUserThumbnail(
  action: FetchCreateUploadUrlCommonUserThumbnail
) {
  const {
    payload: { file },
  } = action;

  try {
    const responseUploadUrl: AxiosResponse<UploadDataState> = yield call(
      FileAPI.createUrlUser,
      file
    );

    const {
      data: { url },
    } = responseUploadUrl;

    if (!url) {
      yield put({
        type: ErrorActionType.ERROR,
        payload: {
          error: true,
          code: 404,
        },
      });
      return;
    }

    yield put({
      type: UserActionType.CREATE_UPLOAD_URL_COMMON_USER_THUMBNAIL_SUCCESS,
      payload: {
        url,
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

function* createUploadUrlCoverBackGround(
  action: FetchCreateUploadUrlCoverBackGround
) {
  const {
    payload: { file },
  } = action;

  try {
    const responseUploadUrl: AxiosResponse<UploadDataState> = yield call(
      FileAPI.createUrlCover,
      file
    );

    const {
      data: { url },
    } = responseUploadUrl;

    if (!url) {
      yield put({
        type: ErrorActionType.ERROR,
        payload: {
          error: true,
          code: 404,
        },
      });
      return;
    }

    yield put({
      type: UserActionType.CREATE_UPLOAD_URL_COVER_BACKGROUND_SUCCESS,
      payload: {
        url,
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

function* getUserProfileInfo(action: FetchGetUserProfileInfo) {
  const {
    payload: { username },
  } = action;

  try {
    const responseGetUserProfileInfo: AxiosResponse<
      UserProfileState
    > = yield call(UserAPI.getUserInfo, username);

    yield put({
      type: UserActionType.GET_USER_PROFILE_INFO_SUCCESS,
      payload: {
        profile: responseGetUserProfileInfo.data,
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

function* setUser() {
  const {
    payload: { authResult },
  }: FetchAuthResult = yield take<Action<UserActionType.SET_USER_REQUEST>>(
    UserActionType.SET_USER_REQUEST
  );

  if (!authResult || authResult === undefined) {
    storage.remove('__log_share__');
    return;
  }

  yield put({
    type: UserActionType.SET_USER_SUCCESS,
    payload: {
      authResult,
    },
  });

  storage.set('__log_share__', authResult);
  window.location.href = '/';
}

function* logOut(action: any) {
  console.log('요청');

  try {
    yield call(AuthAPI.logout);
    console.log('요청');

    storage.remove('__log_share__');
    window.location.href = '/';
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

function* editProfile(action: FetchEditProfile) {
  const {
    payload: { username, thumbnail, cover, shortBio },
  } = action;

  try {
    const responseEditProfile: AxiosResponse<ProfileDataState> = yield call(
      UserAPI.editProfile,
      {
        username,
        thumbnail,
        cover,
        shortBio,
      }
    );

    yield put({
      type: UserActionType.EDIT_PROFILE_SUBMIT_SUCCESS,
      payload: {
        profile: responseEditProfile.data.profile.profile,
        status: responseEditProfile.status === 200 ? true : false,
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

function* watchEditProfile() {
  yield takeEvery(UserActionType.EDIT_PROFILE_SUBMIT_REQUEST, editProfile);
}

function* watchCreateUploadUrlUserThumbnail() {
  yield takeEvery(
    UserActionType.CREATE_UPLOAD_URL_COMMON_USER_THUMBNAIL_REQUEST,
    createUploadUrlCommonUserThumbnail
  );
}

function* watchCreateUploadUrlCover() {
  yield takeEvery(
    UserActionType.CREATE_UPLOAD_URL_COVER_BACKGROUND_REQUEST,
    createUploadUrlCoverBackGround
  );
}

function* watchGetUserProfileInfo() {
  yield takeEvery(
    UserActionType.GET_USER_PROFILE_INFO_REQUEST,
    getUserProfileInfo
  );
}

function* watchLogout() {
  yield takeEvery(UserActionType.LOGOUT, logOut);
}

export default function* userSaga() {
  yield all([
    fork(setUser),
    fork(watchLogout),
    fork(watchGetUserProfileInfo),
    fork(watchCreateUploadUrlCover),
    fork(watchCreateUploadUrlUserThumbnail),
    fork(watchEditProfile),
  ]);
}
