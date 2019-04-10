import { GenericResponseAction } from 'src/lib/common';
import { PostsSubState } from '../list/posts';
import { MessageSubState } from '../list/notices';
import { UsersSubState } from '../list/users';
import { FeaturedUsersSubState, FeaturedPostsSubState } from '../list/featured';

export type ListPostsPayload = {
  username: string | null;
};
export type ListVideoPayload = {
  username?: string | null;
};
export type TagsPostsPayload = {
  tag: string;
};
export type PrefetchListPayload = {
  next: string;
};
export type ListUsersPayload = {
  username: string;
};
export type PostsListAction = GenericResponseAction<
  {
    posts: {
      postWithData: PostsSubState[];
      next: string;
    };
  },
  string
>;
export type UsersListAction = GenericResponseAction<
  {
    users: {
      usersWithData: UsersSubState[];
      next: string;
    };
  },
  string
>;
export type NoticesListAction = GenericResponseAction<
  {
    message: MessageSubState[];
    next: string;
  },
  string
>;
export type FeaturedUsersAction = GenericResponseAction<
  {
    users: FeaturedUsersSubState[];
  },
  string
>;
export type FeaturedPostsAction = GenericResponseAction<
  {
    posts: FeaturedPostsSubState[];
  },
  string
>;
