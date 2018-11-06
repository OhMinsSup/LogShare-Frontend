import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

const CHANGE_INPUT = 'auth/CHANGE_INPUT';
const SET_ERROR = 'auth/SET_ERROR';

type ChangeInputPayload = { form: string; name: string; value: string };
type ErrorPayload = { form: string; name: string; message: string | null };

export const authCreators = {
  changeInput: createAction(
    CHANGE_INPUT,
    (payload: ChangeInputPayload) => payload
  ),
  setError: createAction(SET_ERROR, (payload: ErrorPayload) => payload),
};

type ChangeInputAction = ReturnType<typeof authCreators.changeInput>;
type SetErrorAction = ReturnType<typeof authCreators.setError>;

export interface LoginFormState {
  email: string;
  password: string;
  error: string | null;
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
  },
  initialState
);
