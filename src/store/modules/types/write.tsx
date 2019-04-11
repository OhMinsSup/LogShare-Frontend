import { GenericResponseAction } from 'src/lib/common';
import { PostDataState } from '../post';

export type CreateUploadUrlPostAction = GenericResponseAction<
  { url: string; path: string; name: string },
  string
>;
export type SetInsertTextAction = GenericResponseAction<
  { text: string },
  string
>;
export type WriteSubmitAction = GenericResponseAction<
  {
    postId: string;
  },
  string
>;
export type EditSubmitAction = GenericResponseAction<
  {
    postId: string;
  },
  string
>;
export type GetPostAction = GenericResponseAction<
  {
    postData: PostDataState | null;
  },
  string
>;
