import { handleActions, createAction } from 'redux-actions';
import produce from 'immer';
import * as WriteType from './types/write';

export enum WriteActionType {
  INITIAL = 'write/INITIAL',
  CHANGE_INPUT = 'write/CHANGE_INPUT',

  INSERT_TAG = 'write/INSERT_TAG',
  REMOVE_TAG = 'write/REMOVE_TAG',

  SET_THUMBNAIL = 'write/SET_THUMBNAIL',

  SET_INSERT_TEXT = 'write/SET_INSERT_TEXT',

  SET_CLEAR_INSERT_TEXT = 'write/SET_CLEAR_INSERT_TEXT',

  SET_UPLOAD_MASK = 'write/SET_UPLOAD_MASK',

  SHOW_WRITE_SUBMIT = 'write/SHOW_WRITE_SUBMIT',
  HIDE_WRITE_SUBMIT = 'write/HIDE_WRITE_SUBMIT',

  CREATE_UPLOAD_URL_POST_IMAGE_REQUEST = 'write/CREATE_UPLOAD_URL_POST_IMAGE_REQUEST',
  CREATE_UPLOAD_URL_POST_IMAGE_SUCCESS = 'write/CREATE_UPLOAD_URL_POST_IMAGE_SUCCESS',

  CREATE_UPLOAD_URL_POST_THUMBNAIL_REQUEST = 'write/CREATE_UPLOAD_URL_POST_THUMBNAIL_REQUEST',
  CREATE_UPLOAD_URL_POST_THUMBNAIL_SUCCESS = 'write/CREATE_UPLOAD_URL_POST_THUMBNAIL_SUCCESS',

  WRITE_SUBMIT_REQUEST = 'write/WRITE_SUBMIT_REQUEST',
  WRITE_SUBMIT_SUCCESS = 'write/WRITE_SUBMIT_SUCCESS',

  GET_POST_REQUEST = 'write/GET_POST_REQUEST',
  GET_POST_SUCCESS = 'write/GET_POST_SUCCESS',

  EDIT_SUBMIT_REQUEST = 'write/EDIT_SUBMIT_REQUEST',
  EDIT_SUBMIT_SUCCESS = 'write/EDIT_SUBMIT_SUCCESS',
}

export const writeCreators = {
  initial: createAction(WriteActionType.INITIAL),
  insertTag: createAction(WriteActionType.INSERT_TAG, (tag: string) => tag),
  removeTag: createAction(WriteActionType.REMOVE_TAG, (tag: string) => tag),
  setClearInsertText: createAction(WriteActionType.SET_CLEAR_INSERT_TEXT),
  setUploadMask: createAction(
    WriteActionType.SET_UPLOAD_MASK,
    (visible: boolean) => visible
  ),
  setThumbnail: createAction(WriteActionType.SET_THUMBNAIL),
  showWriteSubmit: createAction(
    WriteActionType.SHOW_WRITE_SUBMIT,
    (visible: boolean) => visible
  ),
  hideWriteSubmit: createAction(
    WriteActionType.HIDE_WRITE_SUBMIT,
    (visible: boolean) => visible
  ),
  changeInput: createAction(
    WriteActionType.CHANGE_INPUT,
    (payload: WriteType.ChangeInputPayload) => payload
  ),
  createUploadUrlPostThumbnail: createAction(
    WriteActionType.CREATE_UPLOAD_URL_POST_THUMBNAIL_REQUEST,
    (payload: WriteType.CreateUploadUrlPostPayload) => payload
  ),
  createUploadUrlPostImage: createAction(
    WriteActionType.CREATE_UPLOAD_URL_POST_IMAGE_REQUEST,
    (payload: WriteType.CreateUploadUrlPostPayload) => payload
  ),
  writeSubmit: createAction(
    WriteActionType.WRITE_SUBMIT_REQUEST,
    (payload: WriteType.WriteSubmitPayload) => payload
  ),
  editSubmit: createAction(
    WriteActionType.EDIT_SUBMIT_REQUEST,
    (payload: WriteType.EditSubmitPayload) => payload
  ),
  getPost: createAction(
    WriteActionType.GET_POST_REQUEST,
    (payload: WriteType.GetPostPayload) => payload
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

export interface SettingState {
  mask: boolean;
  insertText: string | null;
}

export interface WriteState {
  editor: EditorState;
  submitBox: SubmitBoxState;
  upload: UploadState;
  setting: SettingState;
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
  setting: {
    mask: false,
    insertText: null,
  },
  postId: null,
};

export default handleActions<WriteState, any>(
  {
    [WriteActionType.INITIAL]: () => {
      return initialState;
    },
    [WriteActionType.SET_UPLOAD_MASK]: (
      state,
      action: WriteType.SetUploadMaskAction
    ) => {
      return produce(state, draft => {
        if (action.payload === undefined) return;
        draft.setting.mask = action.payload;
      });
    },
    [WriteActionType.SET_CLEAR_INSERT_TEXT]: state => {
      return produce(state, draft => {
        draft.setting.insertText = null;
      });
    },
    [WriteActionType.SET_INSERT_TEXT]: (
      state,
      action: WriteType.SetInsertTextAction
    ) => {
      return produce(state, draft => {
        if (action.payload === undefined) return;
        draft.setting.insertText = action.payload.text;
      });
    },
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
    [WriteActionType.SET_THUMBNAIL]: state => {
      return produce(state, draft => {
        draft.upload = {
          url: '',
          path: '',
          name: '',
        };
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
    [WriteActionType.CREATE_UPLOAD_URL_POST_THUMBNAIL_SUCCESS]: (
      state,
      action: WriteType.CreateUploadUrlPostAction
    ) => {
      return produce(state, draft => {
        if (action.payload === undefined) return;
        draft.upload = action.payload;
      });
    },
    [WriteActionType.CREATE_UPLOAD_URL_POST_IMAGE_SUCCESS]: (
      state,
      action: WriteType.CreateUploadUrlPostAction
    ) => {
      return produce(state, draft => {
        if (action.payload === undefined) return;
        draft.upload = action.payload;
      });
    },
    [WriteActionType.WRITE_SUBMIT_SUCCESS]: (
      state,
      action: WriteType.WriteSubmitAction
    ) => {
      return produce(state, draft => {
        if (action.payload === undefined) return;
        draft.postId = action.payload.postId;
        draft.editor = {
          post_thumbnail: null,
          body: '',
          title: '',
        };
        draft.submitBox.tags = [];
      });
    },
    [WriteActionType.GET_POST_SUCCESS]: (
      state,
      action: WriteType.GetPostAction
    ) => {
      return produce(state, draft => {
        if (!action.payload.postData) return;
        draft.editor.title = action.payload.postData.title;
        draft.editor.body = action.payload.postData.body;
        draft.editor.post_thumbnail = action.payload.postData.post_thumbnail;
        draft.submitBox.tags = action.payload.postData.tag;
        draft.upload.url = action.payload.postData.post_thumbnail as string;
      });
    },
    [WriteActionType.EDIT_SUBMIT_SUCCESS]: (
      state,
      action: WriteType.EditSubmitAction
    ) => {
      return produce(state, draft => {
        if (action.payload === undefined) return;
        draft.postId = action.payload.postId;
        draft.editor = {
          post_thumbnail: null,
          body: '',
          title: '',
        };
        draft.submitBox.tags = [];
      });
    },
  },
  initialState
);
