import { handleActions, createAction } from 'redux-actions';
import produce from 'immer';
import * as SettingType from './types/setting';

export enum SettingActionType {
  GET_PROFILE_INFO_REQUEST = 'setting/GET_PROFILE_INFO_REQUEST',
  GET_PROFILE_INFO_SUCCESS = 'setting/GET_PROFILE_INFO_SUCCESS',

  UPDATE_PROFILE_LINKES_REQUEST = 'setting/UPDATE_PROFILE_LINKES_REQUEST',
  UPDATE_PROFILE_LINKES_SUCCESS = 'setting/UPDATE_PROFILE_LINKES_SUCCESS',

  UPDATE_EMAIL_PERMISSIONS_REQUEST = 'setting/UPDATE_EMAIL_PERMISSIONS_REQUEST',
  UPDATE_EMAIL_PERMISSIONS_SUCCESS = 'setting/UPDATE_EMAIL_PERMISSIONS_SUCCESS',
}

export const settingCreators = {
  getProfileInfo: createAction(SettingActionType.GET_PROFILE_INFO_REQUEST),
  updateProfileLinks: createAction(
    SettingActionType.UPDATE_PROFILE_LINKES_REQUEST,
    (payload: SettingType.UpdateProfileLinksPayload) => payload
  ),
  updateEmailPermissions: createAction(
    SettingActionType.UPDATE_EMAIL_PERMISSIONS_REQUEST,
    (payload: SettingType.UpdateEmailPermissionsPayload) => payload
  ),
};

export interface ProfileState {
  facebook: string;
  github: string;
  twitter: string;
  email_promotion: boolean;
}

export interface SettingState {
  profile: ProfileState;
  askSetting: boolean;
}

const initialState: SettingState = {
  profile: {
    facebook: '',
    github: '',
    twitter: '',
    email_promotion: false,
  },
  askSetting: false,
};

export default handleActions<SettingState, any>(
  {
    [SettingActionType.GET_PROFILE_INFO_SUCCESS]: (
      state,
      action: SettingType.GetProfileInfoAction
    ) => {
      return produce(state, draft => {
        if (action.payload === undefined) return;
        const {
          payload: { profile },
        } = action;
        draft.profile = profile;
      });
    },
    [SettingActionType.UPDATE_PROFILE_LINKES_SUCCESS]: (
      state,
      action: SettingType.UpdateProfileLinksAction
    ) => {
      return produce(state, draft => {
        if (action.payload === undefined) return;
        const {
          payload: {
            profile_linkes: { facebook, twiiter, github },
            askSetting,
          },
        } = action;
        draft.profile.facebook = facebook;
        draft.profile.github = github;
        draft.profile.twitter = twiiter;
        draft.askSetting = askSetting;
      });
    },
    [SettingActionType.UPDATE_EMAIL_PERMISSIONS_SUCCESS]: (
      state,
      action: SettingType.UpdateEmailPermissionsAction
    ) => {
      return produce(state, draft => {
        if (action.payload === undefined) return;
        const {
          payload: { email_promotion, askSetting },
        } = action;

        draft.profile.email_promotion = email_promotion;
        draft.askSetting = askSetting;
      });
    },
  },
  initialState
);
