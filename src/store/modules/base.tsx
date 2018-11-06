import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

const SHOW_USER_MENU = 'base/SHOW_USER_MENU';
const HIDE_USER_MENU = 'base/HIDE_USER_MENU';

export const baseCreators = {
  showUserMenu: createAction(SHOW_USER_MENU),
  hideUserMenu: createAction(HIDE_USER_MENU),
};

export interface BaseState {
  user_menu: {
    visible: boolean;
  };
}

const initialState: BaseState = {
  user_menu: {
    visible: false,
  },
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
  },
  initialState
);
