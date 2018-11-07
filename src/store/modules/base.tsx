import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

const SHOW_USER_MENU = 'base/SHOW_USER_MENU';
const HIDE_USER_MENU = 'base/HIDE_USER_MENU';
const SET_WIDTH = 'base/SET_WIDTH';

export const baseCreators = {
  showUserMenu: createAction(SHOW_USER_MENU),
  hideUserMenu: createAction(HIDE_USER_MENU),
  setWidth: createAction(SET_WIDTH, (width: number) => width),
};

type SetWidthAction = ReturnType<typeof baseCreators.setWidth>;

export interface BaseState {
  user_menu: {
    visible: boolean;
  };
  width: number;
}

const initialState: BaseState = {
  user_menu: {
    visible: false,
  },
  width: 1920,
};

export default handleActions<BaseState, any>(
  {
    [SHOW_USER_MENU]: state => {
      return produce(state, draft => {
        draft.user_menu.visible = true;
      });
    },
    [HIDE_USER_MENU]: state => {
      return produce(state, draft => {
        draft.user_menu.visible = false;
      });
    },
    [SET_WIDTH]: (state, action: SetWidthAction) => {
      return produce(state, draft => {
        if (action.payload === undefined) return;
        draft.width = action.payload;
      });
    },
  },
  initialState
);
