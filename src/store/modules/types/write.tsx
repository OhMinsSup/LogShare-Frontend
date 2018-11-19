import { writeCreators } from '../write';
import { GenericResponseAction } from 'src/lib/common';

export type ChangeInputPayload = { name: string; value: string };
export type CreateUploadUrlPostPayload = {
  file: File;
};

export type ChangeInputAction = ReturnType<typeof writeCreators.changeInput>;
export type InsertTagAction = ReturnType<typeof writeCreators.insertTag>;
export type RemoveTagAction = ReturnType<typeof writeCreators.removeTag>;
export type SetThumbnailAction = ReturnType<typeof writeCreators.setThumbnail>;
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
