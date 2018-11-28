import { GenericResponseAction } from 'src/lib/common';
import { PostsSubState } from '../list/posts';
import { TagsDataState } from '../list/tags';

export type ListPostsPayload = {
  username?: string | null;
};
export type TagsPostsPayload = {
  tag: string;
};
export type PrefetchListPayload = {
  next: string;
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
export type TagsListAction = GenericResponseAction<
  {
    tags: TagsDataState[];
  },
  string
>;
