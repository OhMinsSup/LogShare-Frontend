import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

export enum BaseActionType {
  SHOW_USER_MENU = 'base/SHOW_USER_MENU',
  HIDE_USER_MENU = 'base/HIDE_USER_MENU',
  SET_WIDTH = 'base/SET_WIDTH',
}

export const baseCreators = {
  showUserMenu: createAction(BaseActionType.SHOW_USER_MENU),
  hideUserMenu: createAction(BaseActionType.HIDE_USER_MENU),
  setWidth: createAction(BaseActionType.SET_WIDTH, (width: number) => width),
};

type SetWidthAction = ReturnType<typeof baseCreators.setWidth>;

export interface BaseState {
  user_menu: {
    visible: boolean;
  };
  window: {
    width: number;
  };
}

const initialState: BaseState = {
  user_menu: {
    visible: false,
  },
  window: {
    width: 1920,
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
    [BaseActionType.SET_WIDTH]: (state, action: SetWidthAction) => {
      return produce(state, draft => {
        if (action.payload === undefined) return;
        draft.window.width = action.payload;
      });
    },
  },
  initialState
);
