import { combineReducers } from 'redux';
import posts, { PostsState } from './posts';
import trending, { TrendingState } from './trending';
import tags, { TagsState } from './tags';

export default combineReducers({
  posts: posts,
  trending: trending,
  tags: tags,
});

export interface ListState {
  posts: PostsState;
  trending: TrendingState;
  tags: TagsState;
}
