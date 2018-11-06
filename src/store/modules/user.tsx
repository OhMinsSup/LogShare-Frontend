import { handleActions, createAction } from 'redux-actions';
import produce from 'immer';

const SET_USER = 'user/SET_USER ';
const PROCESS = 'user/PROCESS';
const LOGOUT = 'user/LOGOUT';

export const userCreators = {
  setUser: createAction(SET_USER, (payload: UserSubState) => payload),
  process: createAction(PROCESS),
  logout: createAction(LOGOUT),
};

type SetUserAction = ReturnType<typeof userCreators.setUser>;

export interface UserSubState {
  _id: string;
  email: string;
  profile: {
    thumbnail: string;
    shortBio: string;
    username: string;
  };
}

export interface UserState {
  user: UserSubState | null;
  processed: boolean;
}

const initialState: UserState = {
  user: null,
  processed: false,
};

export default handleActions<UserState, any>(
  {
    [SET_USER]: (state, action: SetUserAction) => {
      return produce(state, draft => {
        if (action.payload === undefined) return;
        draft.user = action.payload;
      });
    },
    [PROCESS]: state => {
      return produce(state, draft => {
        draft.processed = true;
      });
    },
  },
  initialState
);
