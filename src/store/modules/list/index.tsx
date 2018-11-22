import { combineReducers } from 'redux';
import posts, { PostsState } from './posts';

const list = combineReducers({
  posts: posts,
});

export interface ListState {
  posts: PostsState;
}

export default list;
