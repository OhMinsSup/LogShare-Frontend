import { combineReducers } from 'redux';
import posts, { PostsState } from './posts';
import trending, { TrendingState } from './trending';
import tags, { TagsState } from './tags';
import likes, { LikesState } from './likes';

export default combineReducers({
  posts: posts,
  trending: trending,
  tags: tags,
  likes: likes,
});

export interface ListState {
  posts: PostsState;
  trending: TrendingState;
  tags: TagsState;
  likes: LikesState;
}
