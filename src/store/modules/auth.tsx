import produce from 'immer';
import { createAction, handleActions } from 'redux-actions';
import { History } from 'history';
import * as AuthType from './types/auth';

export enum AuthActionType {
  LOCAL_REGISTER_REQUEST = 'auth/LOCAL_REGISTER_REQUEST',
  LOCAL_REGISTER_SUCCESS = 'auth/LOCAL_REGISTER_SUCCESS',

  LOCAL_LOGIN_REQUEST = 'auth/LOCAL_LOGIN_REQUEST',
  LOCAL_LOGIN_SUCCESS = 'auth/LOCAL_LOGIN_SUCCESS',

  CHECK_EXISTS_REQUEST = 'auth/CHECK_EXISTS_REQUEST',
  CHECK_EXISTS_SUCCESS = 'auth/CHECK_EXISTS_SUCCESS',

  GET_PROVIDER_TOKEN_REQUEST = 'auth/GET_PROVIDER_TOKEN_REQUEST',
  GET_PROVIDER_TOKEN_SUCCESS = 'auth/GET_PROVIDER_TOKEN_SUCCESS',

  VERIFY_SOCIAL_SUCCESS = 'auth/VERIFY_SOCIAL_SUCCESS',
  SOCIAL_LOGIN_SUCCESS = 'auth/SOCIAL_LOGIN_SUCCESS',

  SOCIAL_REGISTER_REQUEST = 'auth/SOCIAL_REGISTER_REQUEST',
  SOCIAL_REGISTER_SUCCESS = 'auth/SOCIAL_REGISTER_SUCCESS',

  SET_ERROR = 'auth/SET_ERROR_REQUEST',
  SET_NEXT_URL = 'auth/SET_NEXT_URL',
  CHANGE_INPUT = 'auth/CHANGE_INPUT_REQUEST',
  AUTOCOMPLETE_REGISTER_FORM = 'auth/AUTOCOMPLETE_REGISTER_FORM',

  INITIAL = 'auth/INITIAL',
}

export const authCreators = {
  initial: createAction(AuthActionType.INITIAL),
  callbackSocial: createAction(
    AuthActionType.GET_PROVIDER_TOKEN_REQUEST,
    (payload: { provider: string; next: string; history: History }) => payload
  ),
  changeInput: createAction(
    AuthActionType.CHANGE_INPUT,
    (payload: { form: string; name: string; value: string }) => payload
  ),
  autoCompleteRegisterForm: createAction(
    AuthActionType.AUTOCOMPLETE_REGISTER_FORM,
    (payload: { email: string; username: string }) => payload
  ),
  setError: createAction(
    AuthActionType.SET_ERROR,
    (payload: { form: string; name: string; message: string | null }) => payload
  ),
  setNextUrl: createAction(
    AuthActionType.SET_NEXT_URL,
    (visible: boolean) => visible
  ),
  checkExists: createAction(
    AuthActionType.CHECK_EXISTS_REQUEST,
    (payload: { key: string; value: string }) => payload
  ),
  localRegister: createAction(
    AuthActionType.LOCAL_REGISTER_REQUEST,
    (payload: { email: string; username: string; password: string }) => payload
  ),
  localLogin: createAction(
    AuthActionType.LOCAL_LOGIN_REQUEST,
    (payload: { email: string; password: string }) => payload
  ),
  socialRegister: createAction(
    AuthActionType.SOCIAL_REGISTER_REQUEST,
    (payload: {
      accessToken: string;
      provider: string;
      username: string;
      history: History;
    }) => payload
  ),
};

type ChangeInputAction = ReturnType<typeof authCreators.changeInput>;
type SetErrorAction = ReturnType<typeof authCreators.setError>;
type SetNextUrlAction = ReturnType<typeof authCreators.setNextUrl>;
type AutoCompleteRegisterFormAction = ReturnType<
  typeof authCreators.autoCompleteRegisterForm
>;

export interface LoginFormState {
  email: string;
  password: string;
  error: string;
}

export interface ExistsState {
  email: boolean;
  username: boolean;
  password: boolean;
}

export interface RegisterFormState {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
  error: string | null;
}

export interface AuthResultState {
  _id: string;
  username: string;
  thumbnail: string;
  shortBio: string;
  email: string;
}

export interface SocialResultState {
  provider: string;
  accessToken: string;
}

export interface TokenDataState {
  type: string | null;
  token: string | null;
}

export interface VerifySocialResultState {
  id: string;
  thumbnail: string;
  email: string;
  username: string;
  exists: boolean;
}

export interface AuthState {
  login_form: LoginFormState;
  register_form: RegisterFormState;
  exists: ExistsState;
  authResult: AuthResultState | null;
  nextUrl: boolean;
  isSocial: boolean;
  socialAuthResult: SocialResultState | null;
  tokenData: TokenDataState | null;
  verifySocialResult: VerifySocialResultState | null;
}

const initialState: AuthState = {
  login_form: {
    email: '',
    password: '',
    error: '',
  },
  register_form: {
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
    error: '',
  },
  exists: {
    email: false,
    username: false,
    password: false,
  },
  authResult: {
    _id: '',
    username: '',
    thumbnail: '',
    shortBio: '',
    email: '',
  },
  socialAuthResult: {
    provider: '',
    accessToken: '',
  },
  tokenData: {
    type: null,
    token: null,
  },
  verifySocialResult: {
    id: '',
    thumbnail: '',
    email: '',
    username: '',
    exists: false,
  },
  isSocial: false,
  nextUrl: false,
};

export default handleActions<AuthState, any>(
  {
    [AuthActionType.INITIAL]: state => {
      return produce(state, draft => {
        draft.login_form = {
          email: '',
          password: '',
          error: '',
        };
        draft.register_form = {
          username: '',
          email: '',
          password: '',
          passwordConfirm: '',
          error: '',
        };
        draft.exists = {
          email: false,
          username: false,
          password: false,
        };
        draft.authResult = {
          _id: '',
          username: '',
          thumbnail: '',
          shortBio: '',
          email: '',
        };
      });
    },
    [AuthActionType.AUTOCOMPLETE_REGISTER_FORM]: (
      state,
      action: AutoCompleteRegisterFormAction
    ) => {
      return produce(state, draft => {
        if (action.payload === undefined) return;
        draft.register_form.username = action.payload.username;
        draft.register_form.email = action.payload.email;
        draft.isSocial = true;
      });
    },
    [AuthActionType.CHANGE_INPUT]: (state, action: ChangeInputAction) => {
      return produce(state, draft => {
        if (action.payload === undefined) return;
        draft[action.payload.form][action.payload.name] = action.payload.value;
      });
    },
    [AuthActionType.SET_NEXT_URL]: (state, action: SetNextUrlAction) => {
      return produce(state, draft => {
        if (action.payload === undefined) return;
        draft.nextUrl = action.payload;
      });
    },
    [AuthActionType.SET_ERROR]: (state, action: SetErrorAction) => {
      return produce(state, draft => {
        if (action.payload === undefined) return;
        draft[action.payload.form][action.payload.name] =
          action.payload.message;
      });
    },
    [AuthActionType.CHECK_EXISTS_SUCCESS]: (
      state,
      action: AuthType.CheckExistsAction
    ) => {
      return produce(state, draft => {
        if (action.payload === undefined) return;
        draft.exists[action.payload.key] = action.payload.exists;
      });
    },
    [AuthActionType.LOCAL_REGISTER_SUCCESS]: (
      state,
      action: AuthType.LocalRegisterAction
    ) => {
      return produce(state, draft => {
        if (action.payload === undefined) return;
        const {
          payload: { user },
        } = action;
        draft.authResult = {
          _id: user._id,
          email: user.email,
          username: user.profile.username,
          thumbnail: user.profile.thumbnail,
          shortBio: user.profile.shortBio,
        };
      });
    },
    [AuthActionType.LOCAL_LOGIN_SUCCESS]: (
      state,
      action: AuthType.LocalLoginAction
    ) => {
      return produce(state, draft => {
        const {
          payload: { user },
        } = action;
        draft.authResult = {
          _id: user._id,
          email: user.email,
          username: user.profile.username,
          thumbnail: user.profile.thumbnail,
          shortBio: user.profile.shortBio,
        };
      });
    },
    [AuthActionType.GET_PROVIDER_TOKEN_SUCCESS]: (
      state,
      action: AuthType.GetProviderTokenAction
    ) => {
      return produce(state, draft => {
        if (action.payload.token === undefined) return;
        const {
          payload: { token, provider },
        } = action;
        draft.socialAuthResult = {
          accessToken: token,
          provider,
        };
        draft.tokenData = {
          type: provider,
          token,
        };
      });
    },
    [AuthActionType.VERIFY_SOCIAL_SUCCESS]: (
      state,
      action: AuthType.VerifySocialAction
    ) => {
      return produce(state, draft => {
        if (action.payload === undefined) return;
        const {
          payload: { profile, exists },
        } = action;
        draft.verifySocialResult = {
          id: profile.id,
          username: profile.name,
          email: profile.email,
          thumbnail: profile.thumbnail,
          exists: exists,
        };
      });
    },
    [AuthActionType.SOCIAL_LOGIN_SUCCESS]: (
      state,
      action: AuthType.SocialLoginAction
    ) => {
      return produce(state, draft => {
        if (action.payload === undefined) return;
        const {
          payload: { user },
        } = action;
        draft.authResult = {
          _id: user._id,
          email: user.email,
          username: user.profile.username,
          shortBio: user.profile.shortBio,
          thumbnail: user.profile.thumbnail,
        };
      });
    },
    [AuthActionType.SOCIAL_REGISTER_SUCCESS]: (
      state,
      action: AuthType.SocialRegisterAction
    ) => {
      return produce(state, draft => {
        const {
          payload: { user },
        } = action;
        draft.authResult = {
          _id: user._id,
          email: user.email,
          username: user.profile.username,
          shortBio: user.profile.shortBio,
          thumbnail: user.profile.thumbnail,
        };
      });
    },
  },
  initialState
);
