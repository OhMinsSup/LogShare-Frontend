import { handleActions, createAction } from 'redux-actions';
import produce from 'immer';
import * as WriteType from './types/write';

export enum WriteActionType {
  CHANGE_INPUT = 'write/CHANGE_INPUT',
}

export const writeCreators = {
  changeInput: createAction(
    WriteActionType.CHANGE_INPUT,
    (payload: WriteType.ChangeInputPayload) => payload
  ),
};

export interface SubmitBoxState {
  open: boolean;
  tags: string[];
}

export interface UploadState {
  url: string;
  path: string;
  name: string;
}

export interface EditorState {
  post_thumbnail: string | null;
  title: string;
  body: string;
}

export interface WriteState {
  editor: EditorState;
  submitBox: SubmitBoxState;
  upload: UploadState;
  postId: string | null;
}
const initialState: WriteState = {
  editor: {
    post_thumbnail: null,
    title: '',
    body: '',
  },
  submitBox: {
    open: false,
    tags: [],
  },
  upload: {
    url: '',
    path: '',
    name: '',
  },
  postId: null,
};

export default handleActions<WriteState, any>(
  {
    [WriteActionType.CHANGE_INPUT]: (
      state,
      action: WriteType.ChangeInputAction
    ) => {
      return produce(state, draft => {
        if (action.payload === undefined) return;
        draft.editor[action.payload.name] = action.payload.value;
      });
    },
  },
  initialState
);
