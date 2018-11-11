import { handleActions, createAction } from 'redux-actions';
import produce from 'immer';
import { GenericResponseAction } from 'src/lib/common';

export enum UserActionType {
  SET_USER_REQUEST = 'user/SET_USER_REQUEST',
  SET_USER_SUCCESS = 'user/SET_USER_SUCCESS',
  PROCESS = 'user/PROCESS',
  LOGOUT = 'user/LOGOUT',
}

type ProcessPayload = {
  authResult: {
    _id: string;
    username: string;
    thumbnail: string;
    shortBio: string;
    email: string;
  };
};

export const userCreators = {
  process: createAction(
    UserActionType.PROCESS,
    (payload: ProcessPayload | null) => payload
  ),
  logout: createAction(UserActionType.LOGOUT),
};

type ProcessAction = ReturnType<typeof userCreators.process>;
type SetUserAction = GenericResponseAction<
  {
    authResult: {
      username: string;
      thumbnail: string;
      shortBio: string;
      email: string;
      _id: string;
    };
  },
  string
>;

export interface UserSubState {
  _id: string;
  email: string;
  thumbnail: string;
  shortBio: string;
  username: string;
}

export interface UserState {
  user: UserSubState | null;
}

const initialState: UserState = {
  user: null,
};

export default handleActions<UserState, any>(
  {
    [UserActionType.SET_USER_SUCCESS]: (state, action: SetUserAction) => {
      return produce(state, draft => {
        if (action.payload.authResult === undefined) return;
        draft.user = action.payload.authResult;
      });
    },
    [UserActionType.PROCESS]: (state, action: ProcessAction) => {
      return produce(state, draft => {
        if (!action.payload || action.payload === null) {
          draft.user = null;
          return;
        }

        draft.user = action.payload.authResult;
      });
    },
  },
  initialState
);
