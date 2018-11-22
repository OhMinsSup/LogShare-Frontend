import { writeCreators } from '../write';
import { GenericResponseAction } from 'src/lib/common';
import { History } from 'history';
import { PostDataState } from '../post';

export type ChangeInputPayload = { name: string; value: string };
export type CreateUploadUrlPostPayload = {
  file: File;
};
export type WriteSubmitPayload = {
  title: string;
  body: string;
  post_thumbnail: string | null;
  tags: string[];
  history: History;
};
export type GetPostPayload = {
  postId: string;
};
export type EditSubmitPayload = {
  postId: string;
  title: string;
  body: string;
  post_thumbnail: string | null;
  tags: string[];
  history: History;
};
export type ChangeInputAction = ReturnType<typeof writeCreators.changeInput>;
export type InsertTagAction = ReturnType<typeof writeCreators.insertTag>;
export type RemoveTagAction = ReturnType<typeof writeCreators.removeTag>;
export type ShowWriteSubmitAction = ReturnType<
  typeof writeCreators.showWriteSubmit
>;
export type HideWriteSubmitAction = ReturnType<
  typeof writeCreators.hideWriteSubmit
>;
export type CreateUploadUrlPostAction = GenericResponseAction<
  { url: string; path: string; name: string },
  string
>;
export type SetInsertTextAction = GenericResponseAction<
  { text: string },
  string
>;
export type SetUploadMaskAction = ReturnType<
  typeof writeCreators.setUploadMask
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
