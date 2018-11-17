import { combineReducers } from 'redux';
import base, { BaseState } from './base';
import user, { UserState } from './user';
import auth, { AuthState } from './auth';
import write, { WriteState } from './write';
import error, { ErrorState } from './error';

export default combineReducers({
  base: base,
  user: user,
  auth: auth,
  write: write,
  error: error,
});

export interface StoreState {
  user: UserState;
  base: BaseState;
  auth: AuthState;
  write: WriteState;
  error: ErrorState;
}
