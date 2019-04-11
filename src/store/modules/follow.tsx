import { handleActions, createAction } from 'redux-actions';
import produce from 'immer';
import { GenericResponseAction } from 'src/lib/common';

export enum FollowActionType {
  FOLLOW_REQUEST = 'follow/FOLLOW_REQUEST',
  FOLLOW_PENDING = 'follow/FOLLOW_PENDING',
  FOLLOW_SUCCESS = 'follow/FOLLOW_SUCCESS',
  FOLLOW_ERROR = 'follow/FOLLOW_ERROR',

  UNFOLLOW_REQUEST = 'follow/UNFOLLOW_REQUEST',
  UNFOLLOW_PENDING = 'follow/UNFOLLOW_PENDING ',
  UNFOLLOW_SUCCESS = 'follow/UNFOLLOW_SUCCESS ',
  UNFOLLOW_ERROR = 'follow/UNFOLLOW_ERROR',

  CHECK_EXISTS_USER_FOLLOW_REQUEST = 'follow/CHECK_EXISTS_USER_FOLLOW_REQUEST',
  CHECK_EXISTS_USER_FOLLOW_SUCCESS = 'follow/CHECK_EXISTS_USER_FOLLOW_SUCCESS',
}

export const followCreators = {
  follow: createAction(
    FollowActionType.FOLLOW_REQUEST,
    (payload: { username: string }) => payload
  ),
  unfollow: createAction(
    FollowActionType.UNFOLLOW_REQUEST,
    (payload: { username: string }) => payload
  ),
  checkExistsUserFollow: createAction(
    FollowActionType.CHECK_EXISTS_USER_FOLLOW_REQUEST,
    (payload: { username: string }) => payload
  ),
};

type FollowAction = GenericResponseAction<
  {
    follow: boolean;
  },
  string
>;

export interface FollowState {
  follow: boolean;
}

const initialState: FollowState = {
  follow: false,
};

export default handleActions<FollowState, any>(
  {
    [FollowActionType.FOLLOW_PENDING]: state => {
      return produce(state, draft => {
        draft.follow = true;
      });
    },
    [FollowActionType.FOLLOW_ERROR]: state => {
      return produce(state, draft => {
        draft.follow = false;
      });
    },
    [FollowActionType.UNFOLLOW_PENDING]: state => {
      return produce(state, draft => {
        draft.follow = false;
      });
    },
    [FollowActionType.UNFOLLOW_ERROR]: state => {
      return produce(state, draft => {
        draft.follow = true;
      });
    },
    [FollowActionType.FOLLOW_SUCCESS]: (state, action: FollowAction) => {
      return produce(state, draft => {
        if (action.payload === undefined) return;
        const {
          payload: { follow },
        } = action;

        draft.follow = follow;
      });
    },
    [FollowActionType.UNFOLLOW_SUCCESS]: (state, action: FollowAction) => {
      return produce(state, draft => {
        if (action.payload === undefined) return;
        const {
          payload: { follow },
        } = action;

        draft.follow = follow;
      });
    },
    [FollowActionType.CHECK_EXISTS_USER_FOLLOW_SUCCESS]: (
      state,
      action: FollowAction
    ) => {
      return produce(state, draft => {
        if (action.payload === undefined) return;
        const {
          payload: { follow },
        } = action;

        draft.follow = follow;
      });
    },
  },
  initialState
);
