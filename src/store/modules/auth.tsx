import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { GenericResponseAction } from 'src/lib/common';

export enum AsyncAuthType {
  CHECK_EXISTS = 'auth/CHECK_EXISTS',
  CHECK_EXISTS_SUCCESS = 'auth/CHECK_EXISTS_SUCCESS',
  CHECK_EXISTS_ERROR = 'auth/CHECK_EXISTS_ERROR',
}

const CHANGE_INPUT = 'auth/CHANGE_INPUT';
const SET_ERROR = 'auth/SET_ERROR';

type ChangeInputPayload = { form: string; name: string; value: string };
type ErrorPayload = { form: string; name: string; message: string | null };
type CheckExistsPayload = { key: string; value: string };

export const authCreators = {
  changeInput: createAction(
    CHANGE_INPUT,
    (payload: ChangeInputPayload) => payload
  ),
  setError: createAction(SET_ERROR, (payload: ErrorPayload) => payload),
  checkExists: createAction(
    AsyncAuthType.CHECK_EXISTS,
    (payload: CheckExistsPayload) => payload
  ),
};

type ChangeInputAction = ReturnType<typeof authCreators.changeInput>;
type SetErrorAction = ReturnType<typeof authCreators.setError>;
type checkExistsAction = GenericResponseAction<
  { exists: boolean; key: string },
  string
>;

export interface LoginFormState {
  email: string;
  password: string;
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

export interface AuthState {
  login_form: LoginFormState;
  register_form: RegisterFormState;
  exists: ExistsState;
}

const initialState: AuthState = {
  login_form: {
    email: '',
    password: '',
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
};

export default handleActions<AuthState, any>(
  {
    [CHANGE_INPUT]: (state, action: ChangeInputAction) => {
      return produce(state, draft => {
        if (action.payload === undefined) return;
        draft[action.payload.form][action.payload.name] = action.payload.value;
      });
    },
    [SET_ERROR]: (state, action: SetErrorAction) => {
      return produce(state, draft => {
        if (action.payload === undefined) return;
        draft[action.payload.form][action.payload.name] =
          action.payload.message;
      });
    },
    [AsyncAuthType.CHECK_EXISTS_SUCCESS]: (
      state,
      action: checkExistsAction
    ) => {
      return produce(state, draft => {
        if (action.payload === undefined) return;
        draft.exists[action.payload.key] = action.payload.exists;
      });
    },
    [AsyncAuthType.CHECK_EXISTS_ERROR]: state => {
      return produce(state, draft => {
        draft.exists = {
          email: false,
          username: false,
          password: false,
        };
      });
    },
  },
  initialState
);
