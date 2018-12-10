import {
  searchCreators,
  SearchPostDataState,
  SearchUserDataState,
} from '../search';
import { GenericResponseAction } from 'src/lib/common';

export type changeSearchTypePayload = {
  type: 'post' | 'user' | 'video';
};
export type SearchValuePayload = {
  value: string;
};
export type ChangeInputPayload = {
  value: string;
};
export type ChangeSearchTypeAction = ReturnType<
  typeof searchCreators.changeSearchType
>;
export type SearchPostsAction = GenericResponseAction<
  {
    posts: SearchPostDataState[];
  },
  string
>;
export type SearchUsersAction = GenericResponseAction<
  {
    users: SearchUserDataState[];
  },
  string
>;
export type ChangeInputAction = ReturnType<typeof searchCreators.changeInput>;
