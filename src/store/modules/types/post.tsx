import { postCreators } from '../post';

export type SetTocAction = ReturnType<typeof postCreators.setToc>;
export type ActivateHeadingAction = ReturnType<
  typeof postCreators.activateHeading
>;
