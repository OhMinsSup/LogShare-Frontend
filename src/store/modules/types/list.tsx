import { GenericResponseAction } from 'src/lib/common';
import { PostsSubState } from '../list/posts';
import { TagsDataState } from '../list/tags';
import { UsersSubState } from '../list/follows';
import { MessageSubState } from '../list/notices';

export type ListPostsPayload = {
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
export type TagsListAction = GenericResponseAction<
  {
    tags: TagsDataState[];
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
