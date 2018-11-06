import { combineReducers } from 'redux';
import base, { BaseState } from './base';
import user, { UserState } from './user';
import auth, { AuthState } from './auth';

export default combineReducers({
  base: base,
  user: user,
  auth: auth,
});

export interface StoreState {
  user: UserState;
  base: BaseState;
  auth: AuthState;
}
