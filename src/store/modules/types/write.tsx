import { writeCreators } from '../write';

export type ChangeInputPayload = { name: string; value: string };

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
