import { combineReducers } from 'redux';
import posts, { PostsState } from './posts';
import trending, { TrendingState } from './trending';
import tags, { TagsState } from './tags';
import likes, { LikesState } from './likes';
import follows, { FollowsState } from './follows';
import users, { UsersState } from './users';

export default combineReducers({
  posts: posts,
  trending: trending,
  tags: tags,
  likes: likes,
  follows: follows,
  users: users,
});

export interface ListState {
  posts: PostsState;
  trending: TrendingState;
  tags: TagsState;
  likes: LikesState;
  follows: FollowsState;
  users: UsersState;
}
