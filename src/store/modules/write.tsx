import { handleActions, createAction } from 'redux-actions';
import produce from 'immer';
import * as WriteType from './types/write';

export enum WriteActionType {
  CHANGE_INPUT = 'write/CHANGE_INPUT',
  INSERT_TAG = 'write/INSERT_TAG',
  REMOVE_TAG = 'write/REMOVE_TAG',
  SET_THUMBNAIL = 'write/SET_THUMBNAIL',
  SHOW_WRITE_SUBMIT = 'write/SHOW_WRITE_SUBMIT',
  HIDE_WRITE_SUBMIT = 'write/HIDE_WRITE_SUBMIT',
}

export const writeCreators = {
  changeInput: createAction(
    WriteActionType.CHANGE_INPUT,
    (payload: WriteType.ChangeInputPayload) => payload
  ),
  insertTag: createAction(WriteActionType.INSERT_TAG, (tag: string) => tag),
  removeTag: createAction(WriteActionType.REMOVE_TAG, (tag: string) => tag),
  setThumbnail: createAction(
    WriteActionType.SET_THUMBNAIL,
    (url: string | null) => url
  ),
  showWriteSubmit: createAction(
    WriteActionType.SHOW_WRITE_SUBMIT,
    (visible: boolean) => visible
  ),
  hideWriteSubmit: createAction(
    WriteActionType.HIDE_WRITE_SUBMIT,
    (visible: boolean) => visible
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
    [WriteActionType.INSERT_TAG]: (
      state,
      action: WriteType.InsertTagAction
    ) => {
      return produce(state, draft => {
        if (action.payload === undefined) return;
        draft.submitBox.tags.push(action.payload);
      });
    },
    [WriteActionType.REMOVE_TAG]: (
      state,
      action: WriteType.RemoveTagAction
    ) => {
      return produce(state, draft => {
        if (action.payload === undefined) return;
        draft.submitBox.tags = draft.submitBox.tags.filter(
          t => t !== action.payload
        );
      });
    },
    [WriteActionType.SET_THUMBNAIL]: (
      state,
      action: WriteType.SetThumbnailAction
    ) => {
      return produce(state, draft => {
        if (action.payload === undefined) return;
        draft.editor.post_thumbnail = action.payload;
      });
    },
    [WriteActionType.SHOW_WRITE_SUBMIT]: (
      state,
      action: WriteType.ShowWriteSubmitAction
    ) => {
      return produce(state, draft => {
        if (action.payload === undefined) return;
        draft.submitBox.open = action.payload;
      });
    },
    [WriteActionType.HIDE_WRITE_SUBMIT]: (
      state,
      action: WriteType.HideWriteSubmitAction
    ) => {
      return produce(state, draft => {
        if (action.payload === undefined) return;
        draft.submitBox.open = action.payload;
      });
    },
  },
  initialState
);
