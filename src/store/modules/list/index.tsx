import { combineReducers } from 'redux';
import posts, { PostsState } from './posts';
import trending, { TrendingState } from './trending';
import tags, { TagsState } from './tags';
import likes, { LikesState } from './likes';
import follows, { FollowsState } from './follows';
import users, { UsersState } from './users';
import notices, { NoticesState } from './notices';
import userPosts, { UserPostsState } from './userPosts';
import feeds, { FeedsState } from './feeds';

export default combineReducers({
  posts,
  trending,
  tags,
  likes,
  follows,
  users,
  notices,
  userPosts,
  feeds,
});

export interface ListState {
  posts: PostsState;
  trending: TrendingState;
  tags: TagsState;
  likes: LikesState;
  follows: FollowsState;
  users: UsersState;
  notices: NoticesState;
  userPosts: UserPostsState;
  feeds: FeedsState;
}
