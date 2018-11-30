import { createAction, handleActions } from 'redux-actions';
import * as ListType from '../types/list';
import produce from 'immer';

export enum FollowsActionType {
  REVEAL_FOLLOWS_PREFETCHED = 'list/follows/REVEAL_FOLLOWS_PREFETCHED',

  GET_FOLLOWING_USERS_LIST_REQUEST = 'list/follows/GET_FOLLOWING_USERS_LIST_REQUEST',
  GET_FOLLOWER_USERS_LIST_REQUEST = 'list/follows/GET_FOLLOWER_USERS_LIST_REQUEST',

  GET_FOLLOW_USERS_LIST_PENDING = 'list/follows/GET_FOLLOW_USERS_LIST_PENDING',
  GET_FOLLOW_USERS_LIST_SUCCESS = 'list/follows/GET_FOLLOW_USERS_LIST_SUCCESS',

  PREFETCH_FOLLOWS_LIST_REQUEST = 'list/likes/PREFETCH_FOLLOWS_LIST_REQUEST',
  PREFETCH_FOLLOWS_LIST_SUCCESS = 'list/likes/PREFETCH_FOLLOWS_LIST_SUCCESS',
}

export const followsCreators = {
  getFollowing: createAction(
    FollowsActionType.GET_FOLLOWING_USERS_LIST_REQUEST,
    (payload: ListType.ListUsersPayload) => payload
  ),
  getFollower: createAction(
    FollowsActionType.GET_FOLLOWER_USERS_LIST_REQUEST,
    (payload: ListType.ListUsersPayload) => payload
  ),
  prefetchFollowUsers: createAction(
    FollowsActionType.PREFETCH_FOLLOWS_LIST_REQUEST,
    (payload: ListType.PrefetchListPayload) => payload
  ),
  revealFollowsUsersPrefetched: createAction(
    FollowsActionType.REVEAL_FOLLOWS_PREFETCHED
  ),
};

export interface UsersSubState {
  username: string;
  thumbnail: string;
  shortBio: string;
  cover: string;
  _id: string;
}

export interface ListingSetState {
  user: UsersSubState[];
  prefetched: UsersSubState[];
  end: boolean;
  next: string;
  loading: boolean;
}

export interface FollowsState {
  follows: ListingSetState;
}

const initialListingSet = {
  user: [],
  prefetched: [],
  end: false,
  next: '',
  loading: false,
};

const initialState: FollowsState = {
  follows: initialListingSet,
};

export default handleActions<FollowsState, any>(
  {
    [FollowsActionType.REVEAL_FOLLOWS_PREFETCHED]: state => {
      return produce(state, draft => {
        const { user, prefetched } = draft.follows;
        if (user && prefetched) {
          user.push(...prefetched);
          draft.follows.prefetched = [];
        }
      });
    },
    [FollowsActionType.GET_FOLLOW_USERS_LIST_PENDING]: state => {
      return produce(state, draft => {
        draft.follows.loading = true;
      });
    },
    [FollowsActionType.GET_FOLLOW_USERS_LIST_SUCCESS]: (
      state,
      action: ListType.UsersListAction
    ) => {
      return produce(state, draft => {
        if (action.payload === undefined) return;
        const {
          payload: { users },
        } = action;
        draft.follows = {
          user: users.usersWithData,
          prefetched: [],
          end: false,
          next: users.next,
          loading: false,
        };
      });
    },
    [FollowsActionType.PREFETCH_FOLLOWS_LIST_SUCCESS]: (
      state,
      action: ListType.UsersListAction
    ) => {
      return produce(state, draft => {
        if (action.payload === undefined) return;
        const {
          payload: { users },
        } = action;
        draft.follows.prefetched = users.usersWithData;
        draft.follows.next = users.next;
        if (users.usersWithData && users.usersWithData.length === 0) {
          draft.follows.end = true;
        }
      });
    },
  },
  initialState
);
