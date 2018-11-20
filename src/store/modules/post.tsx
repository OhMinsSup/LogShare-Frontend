import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import * as PostType from './types/post';

export enum PostActionType {
  SET_TOC = 'post/SET_TOC',
  ACTIVATE_HEADING = 'post/ACTIVATE_HEADING',
}

export const postCreators = {
  setToc: createAction(PostActionType.SET_TOC, (toc: TocState[] | null) => toc),
  activateHeading: createAction(
    PostActionType.ACTIVATE_HEADING,
    (payload: string) => payload
  ),
};

export interface TocState {
  anchor: string;
  level: number;
  text: string;
}

export interface PostDataState {
  _id: string;
  post_thumbnail: string | null;
  title: string;
  body: string;
  liked: boolean;
  createdAt: string;
  tag: string[];
  info: {
    likes: number;
    comments: number;
  };
  user: {
    username: string;
    thumbnail: string;
    _id: string;
  };
}

export interface PostState {
  postData: PostDataState | null;
  toc: TocState[] | null;
  activeHeading: string | null;
}

const initialState: PostState = {
  postData: null,
  toc: null,
  activeHeading: null,
};

export default handleActions<PostState, any>(
  {
    [PostActionType.SET_TOC]: (state, action: PostType.SetTocAction) => {
      return produce(state, draft => {
        if (action.payload === undefined) return;
        draft.toc = action.payload;
      });
    },
    [PostActionType.ACTIVATE_HEADING]: (
      state,
      action: PostType.ActivateHeadingAction
    ) => {
      return produce(state, draft => {
        if (action.payload === undefined) return;
        draft.activeHeading = action.payload;
      });
    },
  },
  initialState
);
