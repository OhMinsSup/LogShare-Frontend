import { GenericResponseAction } from 'src/lib/common';
import { PostsSubState } from '../list/posts';

export type ListPostsPayload = {
  username?: string | null;
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
