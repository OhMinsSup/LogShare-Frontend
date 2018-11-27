import { combineReducers } from 'redux';
import posts, { PostsState } from './posts';
import trending, { TrendingState } from './trending';

const list = combineReducers({
  posts: posts,
  trending: trending,
});

export interface ListState {
  posts: PostsState;
  trending: TrendingState;
}

export default list;
