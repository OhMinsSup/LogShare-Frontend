import { handleActions, createAction } from 'redux-actions';
import produce from 'immer';
import * as UserType from './types/user';

export enum UserActionType {
  CHANGE_INPUT = 'user/CHANGE_INPUT_REQUEST',

  EDIT_PROFILE_SUBMIT_REQUEST = 'user/EDIT_PROFILE_SUBMIT_REQUEST',
  EDIT_PROFILE_SUBMIT_SUCCESS = 'user/EDIT_PROFILE_SUBMIT_SUCCESS',

  CREATE_UPLOAD_URL_COMMON_USER_THUMBNAIL_REQUEST = 'user/CREATE_UPLOAD_URL_COMMON_USER_THUMBNAIL_REQUEST',
  CREATE_UPLOAD_URL_COMMON_USER_THUMBNAIL_SUCCESS = 'user/CREATE_UPLOAD_URL_COMMON_USER_THUMBNAIL_SUCCESS',

  CREATE_UPLOAD_URL_COVER_BACKGROUND_REQUEST = 'user/CREATE_UPLOAD_URL_COVER_BACKGROUND_REQUEST',
  CREATE_UPLOAD_URL_COVER_BACKGROUND_SUCCESS = 'user/CREATE_UPLOAD_URL_COVER_BACKGROUND_SUCCESS',

  GET_USER_PROFILE_INFO_REQUEST = 'user/GET_USER_PROFILE_INFO_REQUEST',
  GET_USER_PROFILE_INFO_SUCCESS = 'user/GET_USER_PROFILE_INFO_SUCCESS',

  SET_USER_REQUEST = 'user/SET_USER_REQUEST',
  SET_USER_SUCCESS = 'user/SET_USER_SUCCESS',

  PROCESS = 'user/PROCESS',
  LOGOUT = 'user/LOGOUT',
}

export const userCreators = {
  changeInput: createAction(
    UserActionType.CHANGE_INPUT,
    (payload: UserType.ChangeInputPayload) => payload
  ),
  process: createAction(
    UserActionType.PROCESS,
    (payload: UserType.ProcessPayload | null) => payload
  ),
  getUserProfile: createAction(
    UserActionType.GET_USER_PROFILE_INFO_REQUEST,
    (payload: UserType.GetUserProfileInfoPayload) => payload
  ),
  createUploadUrlCommonUserThumbnail: createAction(
    UserActionType.CREATE_UPLOAD_URL_COMMON_USER_THUMBNAIL_REQUEST,
    (payload: UserType.CreateUploadUserFilePayload) => payload
  ),
  createUploadUrlCoverBackGround: createAction(
    UserActionType.CREATE_UPLOAD_URL_COVER_BACKGROUND_REQUEST,
    (payload: UserType.CreateUploadUserFilePayload) => payload
  ),
  editProfile: createAction(
    UserActionType.EDIT_PROFILE_SUBMIT_REQUEST,
    (payload: UserType.EditProfilePayload) => payload
  ),
  logout: createAction(UserActionType.LOGOUT),
};

export interface UserSubState {
  _id: string;
  email: string;
  thumbnail: string;
  shortBio: string;
  username: string;
}

export interface UserProfileState {
  email: string;
  profile: {
    thumbnail: string;
    shortBio: string;
    username: string;
    cover: string;
  };
  info: {
    post: number;
    follower: number;
    following: number;
  };
  createdAt: string;
}

export interface UserEditProfileState {
  thumbnail: string;
  shortBio: string;
  username: string;
  cover: string;
}

export interface UserState {
  user: UserSubState | null;
  user_profile: UserProfileState;
  edit_profile: UserEditProfileState;
  askProfile: boolean;
}

const initialState: UserState = {
  user: null,
  user_profile: {
    email: '',
    profile: {
      thumbnail: '',
      shortBio: '',
      username: '',
      cover: '',
    },
    info: {
      post: 0,
      follower: 0,
      following: 0,
    },
    createdAt: '',
  },
  edit_profile: {
    username: '',
    thumbnail: '',
    shortBio: '',
    cover: '',
  },
  askProfile: false,
};

export default handleActions<UserState, any>(
  {
    [UserActionType.SET_USER_SUCCESS]: (
      state,
      action: UserType.SetUserAction
    ) => {
      return produce(state, draft => {
        if (action.payload.authResult === undefined) return;
        draft.user = action.payload.authResult;
      });
    },
    [UserActionType.PROCESS]: (state, action: UserType.ProcessAction) => {
      return produce(state, draft => {
        if (!action.payload || action.payload === null) {
          draft.user = null;
          return;
        }

        draft.user = action.payload.authResult;
      });
    },
    [UserActionType.GET_USER_PROFILE_INFO_SUCCESS]: (
      state,
      action: UserType.GetUserProfileInfoAction
    ) => {
      return produce(state, draft => {
        if (!action.payload.profile || action.payload === undefined) return;

        const {
          payload: { profile },
        } = action;

        draft.user_profile = profile;
        draft.edit_profile = {
          thumbnail: profile.profile.thumbnail,
          username: profile.profile.username,
          shortBio: profile.profile.shortBio,
          cover: profile.profile.cover,
        };
      });
    },
    [UserActionType.CHANGE_INPUT]: (
      state,
      action: UserType.ChangeInputAction
    ) => {
      return produce(state, draft => {
        if (action.payload === undefined) return;
        draft.edit_profile[action.payload.name] = action.payload.value;
      });
    },
    [UserActionType.CREATE_UPLOAD_URL_COMMON_USER_THUMBNAIL_SUCCESS]: (
      state,
      action: UserType.CreateUploadUserFileAction
    ) => {
      return produce(state, draft => {
        if (action.payload === undefined) return;
        draft.edit_profile.thumbnail = action.payload.url;
      });
    },
    [UserActionType.CREATE_UPLOAD_URL_COVER_BACKGROUND_SUCCESS]: (
      state,
      action: UserType.CreateUploadUserFileAction
    ) => {
      return produce(state, draft => {
        if (action.payload === undefined) return;
        draft.edit_profile.cover = action.payload.url;
      });
    },
    [UserActionType.EDIT_PROFILE_SUBMIT_SUCCESS]: (
      state,
      action: UserType.EditProfileAction
    ) => {
      return produce(state, draft => {
        if (action.payload === undefined) return;
        draft.edit_profile = action.payload.profile;
        draft.askProfile = action.payload.status;
      });
    },
  },
  initialState
);
