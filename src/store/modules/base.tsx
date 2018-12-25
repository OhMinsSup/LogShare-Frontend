import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import * as BaseType from './types/base';

export enum BaseActionType {
  PROGRESS_BAR_LODING = 'base/PROGRESS_BAR_LODING',
  SHOW_USER_MENU = 'base/SHOW_USER_MENU',
  HIDE_USER_MENU = 'base/HIDE_USER_MENU',
  SET_WIDTH = 'base/SET_WIDTH',
  SET_COMMON_MENU = 'base/SET_COMMON_MENU',
  SET_PROFILE_UPDATE_MODAL = 'base/SET_PROFILE_UPDATE_MODAL',
  SET_CATEGORY_MENU = 'base/SET_CATEGORY_MENU',
}

export const baseCreators = {
  showUserMenu: createAction(BaseActionType.SHOW_USER_MENU),
  hideUserMenu: createAction(BaseActionType.HIDE_USER_MENU),
  setWidth: createAction(BaseActionType.SET_WIDTH, (width: number) => width),
  setCommonMenu: createAction(
    BaseActionType.SET_COMMON_MENU,
    (visible: boolean) => visible
  ),
  setProfileUpdateModal: createAction(
    BaseActionType.SET_PROFILE_UPDATE_MODAL,
    (visible: boolean) => visible
  ),
  setCategoryMenu: createAction(
    BaseActionType.SET_CATEGORY_MENU,
    (visible: boolean) => visible
  ),
};

export interface BaseState {
  user_menu: {
    visible: boolean;
  };
  window: {
    width: number;
  };
  common_menu: {
    visible: boolean;
  };
  profile_modal: {
    visible: boolean;
  };
  category: {
    visible: boolean;
  };
  upload_modal: {
    visible: boolean;
  };
  progress_bar: {
    loding: boolean;
  };
}

const initialState: BaseState = {
  user_menu: {
    visible: false,
  },
  window: {
    width: 1920,
  },
  common_menu: {
    visible: false,
  },
  profile_modal: {
    visible: false,
  },
  category: {
    visible: false,
  },
  upload_modal: {
    visible: false,
  },
  progress_bar: {
    loding: false,
  },
};

export default handleActions<BaseState, any>(
  {
    [BaseActionType.SHOW_USER_MENU]: state => {
      return produce(state, draft => {
        draft.user_menu.visible = true;
      });
    },
    [BaseActionType.HIDE_USER_MENU]: state => {
      return produce(state, draft => {
        draft.user_menu.visible = false;
      });
    },
    [BaseActionType.SET_WIDTH]: (state, action: BaseType.SetWidthAction) => {
      return produce(state, draft => {
        if (action.payload === undefined) return;
        draft.window.width = action.payload;
      });
    },
    [BaseActionType.SET_COMMON_MENU]: (
      state,
      action: BaseType.SetCommonMenuAction
    ) => {
      return produce(state, draft => {
        if (action.payload === undefined) return;
        draft.common_menu.visible = action.payload;
      });
    },
    [BaseActionType.SET_PROFILE_UPDATE_MODAL]: (
      state,
      action: BaseType.SetProfileUpdateModalAction
    ) => {
      return produce(state, draft => {
        if (action.payload === undefined) return;
        draft.profile_modal.visible = action.payload;
      });
    },
    [BaseActionType.SET_CATEGORY_MENU]: (
      state,
      action: BaseType.SetCategoryMenuAction
    ) => {
      return produce(state, draft => {
        if (action.payload === undefined) return;
        draft.category.visible = action.payload;
      });
    },
    [BaseActionType.PROGRESS_BAR_LODING]: (
      state,
      action: BaseType.ProgressLodingAction
    ) => {
      return produce(state, draft => {
        if (!action.payload) return;
        draft.progress_bar.loding = action.payload.loding;
      });
    },
  },
  initialState
);
