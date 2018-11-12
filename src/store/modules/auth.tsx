import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { GenericResponseAction } from 'src/lib/common';

export enum AuthActionType {
  LOCAL_REGISTER_REQUEST = 'auth/LOCAL_REGISTER_REQUEST',
  LOCAL_REGISTER_SUCCESS = 'auth/LOCAL_REGISTER_SUCCESS',
  LOCAL_REGISTER_ERROR = 'auth/LOCAL_REGISTER_ERROR',

  LOCAL_LOGIN_REQUEST = 'auth/LOCAL_LOGIN_REQUEST',
  LOCAL_LOGIN_SUCCESS = 'auth/LOCAL_LOGIN_SUCCESS',
  LOCAL_LOGIN_ERROR = 'auth/LOCAL_LOGIN_ERROR',

  CHECK_EXISTS_REQUEST = 'auth/CHECK_EXISTS_REQUEST',
  CHECK_EXISTS_SUCCESS = 'auth/CHECK_EXISTS_SUCCESS',
  CHECK_EXISTS_ERROR = 'auth/CHECK_EXISTS_ERROR',

  SET_ERROR = 'auth/SET_ERROR_REQUEST',
  CHANGE_INPUT = 'auth/CHANGE_INPUT_REQUEST',

  INITIAL = 'auth/INITIAL',
}

type LocalRegisterPayload = {
  email: string;
  username: string;
  password: string;
};
type ChangeInputPayload = { form: string; name: string; value: string };
type ErrorPayload = { form: string; name: string; message: string | null };
type CheckExistsPayload = { key: string; value: string };
type LocalLoginPayload = { email: string; password: string };

export const authCreators = {
  initial: createAction(AuthActionType.INITIAL),
  changeInput: createAction(
    AuthActionType.CHANGE_INPUT,
    (payload: ChangeInputPayload) => payload
  ),
  setError: createAction(
    AuthActionType.SET_ERROR,
    (payload: ErrorPayload) => payload
  ),
  checkExists: createAction(
    AuthActionType.CHECK_EXISTS_REQUEST,
    (payload: CheckExistsPayload) => payload
  ),
  localRegister: createAction(
    AuthActionType.LOCAL_REGISTER_REQUEST,
    (payload: LocalRegisterPayload) => payload
  ),
  localLogin: createAction(
    AuthActionType.LOCAL_LOGIN_REQUEST,
    (payload: LocalLoginPayload) => payload
  ),
};

type ChangeInputAction = ReturnType<typeof authCreators.changeInput>;
type SetErrorAction = ReturnType<typeof authCreators.setError>;
type CheckExistsAction = GenericResponseAction<
  { exists: boolean; key: string },
  string
>;
type LocalRegisterAction = GenericResponseAction<
  {
    user: {
      _id: string;
      email: string;
      profile: {
        username: string;
        thumbnail: string;
        shortBio: string;
      };
    };
  },
  string
>;

type LocalLoginAction = GenericResponseAction<
  {
    user: {
      _id: string;
      email: string;
      profile: {
        username: string;
        thumbnail: string;
        shortBio: string;
      };
    };
  },
  string
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

export interface AuthState {
  login_form: LoginFormState;
  register_form: RegisterFormState;
  exists: ExistsState;
  authResult: AuthResultState;
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
    [AuthActionType.CHANGE_INPUT]: (state, action: ChangeInputAction) => {
      return produce(state, draft => {
        if (action.payload === undefined) return;
        draft[action.payload.form][action.payload.name] = action.payload.value;
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
      action: CheckExistsAction
    ) => {
      return produce(state, draft => {
        if (action.payload === undefined) return;
        draft.exists[action.payload.key] = action.payload.exists;
      });
    },
    [AuthActionType.CHECK_EXISTS_ERROR]: state => {
      return produce(state, draft => {
        draft.exists = {
          email: false,
          username: false,
          password: false,
        };
      });
    },
    [AuthActionType.LOCAL_REGISTER_SUCCESS]: (
      state,
      action: LocalRegisterAction
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
    [AuthActionType.LOCAL_REGISTER_ERROR]: state => {
      return produce(state, draft => {
        draft.authResult = {
          _id: '',
          username: '',
          thumbnail: '',
          shortBio: '',
          email: '',
        };
      });
    },
    [AuthActionType.LOCAL_LOGIN_SUCCESS]: (state, action: LocalLoginAction) => {
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
    [AuthActionType.LOCAL_LOGIN_ERROR]: state => {
      return produce(state, draft => {
        draft.authResult = {
          _id: '',
          username: '',
          thumbnail: '',
          shortBio: '',
          email: '',
        };
      });
    },
  },
  initialState
);
