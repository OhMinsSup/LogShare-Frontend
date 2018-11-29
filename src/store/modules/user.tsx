import { handleActions, createAction } from 'redux-actions';
import produce from 'immer';
import * as UserType from './types/user';

export enum UserActionType {
  GET_USER_PROFILE_INFO_REQUEST = 'user/GET_USER_PROFILE_INFO_REQUEST',
  GET_USER_PROFILE_INFO_SUCCESS = 'user/GET_USER_PROFILE_INFO_SUCCESS',

  SET_USER_REQUEST = 'user/SET_USER_REQUEST',
  SET_USER_SUCCESS = 'user/SET_USER_SUCCESS',

  PROCESS = 'user/PROCESS',
  LOGOUT = 'user/LOGOUT',
}

export const userCreators = {
  process: createAction(
    UserActionType.PROCESS,
    (payload: UserType.ProcessPayload | null) => payload
  ),
  getUserProfile: createAction(
    UserActionType.GET_USER_PROFILE_INFO_REQUEST,
    (payload: UserType.GetUserProfileInfoPayload) => payload
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
  };
  info: {
    post: number;
    follower: number;
    following: number;
  };
  createdAt: string;
}

export interface UserState {
  user: UserSubState | null;
  user_profile: UserProfileState;
}

const initialState: UserState = {
  user: null,
  user_profile: {
    email: '',
    profile: {
      thumbnail: '',
      shortBio: '',
      username: '',
    },
    info: {
      post: 0,
      follower: 0,
      following: 0,
    },
    createdAt: '',
  },
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
      });
    },
  },
  initialState
);
