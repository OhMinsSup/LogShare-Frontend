import { combineReducers } from 'redux';
import base, { BaseState } from './base';
import user, { UserState } from './user';
import auth, { AuthState } from './auth';
import write, { WriteState } from './write';
import post, { PostState } from './post';
import list, { ListState } from './list';
import error, { ErrorState } from './error';

export default combineReducers({
  base: base,
  user: user,
  auth: auth,
  write: write,
  post: post,
  list: list,
  error: error,
});

export interface StoreState {
  user: UserState;
  base: BaseState;
  auth: AuthState;
  write: WriteState;
  post: PostState;
  list: ListState;
  error: ErrorState;
}
