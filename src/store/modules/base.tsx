import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import * as BaseType from './types/base';

export enum BaseActionType {
  SHOW_USER_MENU = 'base/SHOW_USER_MENU',
  HIDE_USER_MENU = 'base/HIDE_USER_MENU',
  SET_WIDTH = 'base/SET_WIDTH',
  SET_SIDE_BAR = 'base/SET_SIDE_BAR',
}

export const baseCreators = {
  showUserMenu: createAction(BaseActionType.SHOW_USER_MENU),
  hideUserMenu: createAction(BaseActionType.HIDE_USER_MENU),
  setWidth: createAction(BaseActionType.SET_WIDTH, (width: number) => width),
  setSideBar: createAction(
    BaseActionType.SET_SIDE_BAR,
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
  side_bar: {
    visible: boolean;
  };
}

const initialState: BaseState = {
  user_menu: {
    visible: false,
  },
  window: {
    width: 1920,
  },
  side_bar: {
    visible: false,
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
    [BaseActionType.SET_SIDE_BAR]: (
      state,
      action: BaseType.SetSideBarAction
    ) => {
      return produce(state, draft => {
        if (action.payload === undefined) return;
        draft.side_bar.visible = action.payload;
      });
    },
  },
  initialState
);
