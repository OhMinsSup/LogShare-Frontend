import { handleActions, createAction } from 'redux-actions';
import produce from 'immer';
import * as UserType from './types/user';

export enum UserActionType {
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
  logout: createAction(UserActionType.LOGOUT),
};

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
  },
  initialState
);
