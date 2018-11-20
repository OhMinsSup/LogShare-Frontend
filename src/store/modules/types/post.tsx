import { postCreators, PostDataState } from '../post';
import { GenericResponseAction } from 'src/lib/common';

export type ReadPostPayload = {
  postId: string;
};
export type SetTocAction = ReturnType<typeof postCreators.setToc>;
export type ActivateHeadingAction = ReturnType<
  typeof postCreators.activateHeading
>;
export type ReadPostAction = GenericResponseAction<
  {
    postData: PostDataState | null;
  },
  string
>;
