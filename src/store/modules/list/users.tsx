import { createAction, handleActions } from 'redux-actions';
import * as ListType from '../types/list';
import produce from 'immer';

export enum UsersActionType {
  REVEAL_USERS_PREFETCHED = 'list/users/REVEAL_USERS_PREFETCHED',

  GET_USERS_LIST_REQUEST = 'list/users/GET_USERS_LIST_REQUEST',
  GET_USERS_LIST_PENDING = 'list/users/GET_USERS_LIST_PENDING',
  GET_USERS_LIST_SUCCESS = 'list/users/GET_USERS_LIST_SUCCESS',

  PREFETCH_USERS_LIST_REQUEST = 'list/users/PREFETCH_USERS_LIST_REQUEST',
  PREFETCH_USERS_LIST_SUCCESS = 'list/users/PREFETCH_USERS_LIST_SUCCESS',
}

export const usersCreators = {
  getUsers: createAction(UsersActionType.GET_USERS_LIST_REQUEST),
  prefetchUsers: createAction(
    UsersActionType.PREFETCH_USERS_LIST_REQUEST,
    (payload: ListType.PrefetchListPayload) => payload
  ),
  revealUsersPrefetched: createAction(UsersActionType.REVEAL_USERS_PREFETCHED),
};

export interface UsersSubState {
  username: string;
  thumbnail: string;
  shortBio: string;
  _id: string;
}

export interface ListingSetState {
  user: UsersSubState[];
  prefetched: UsersSubState[];
  end: boolean;
  next: string;
  loading: boolean;
}

export interface UsersState {
  users: ListingSetState;
}

const initialListingSet = {
  user: [],
  prefetched: [],
  end: false,
  next: '',
  loading: false,
};

const initialState: UsersState = {
  users: initialListingSet,
};

export default handleActions<UsersState, any>(
  {
    [UsersActionType.REVEAL_USERS_PREFETCHED]: state => {
      return produce(state, draft => {
        const { user, prefetched } = draft.users;
        if (user && prefetched) {
          user.push(...prefetched);
          draft.users.prefetched = [];
        }
      });
    },
    [UsersActionType.GET_USERS_LIST_PENDING]: state => {
      return produce(state, draft => {
        draft.users.loading = true;
      });
    },
    [UsersActionType.GET_USERS_LIST_SUCCESS]: (
      state,
      action: ListType.UsersListAction
    ) => {
      return produce(state, draft => {
        if (action.payload === undefined) return;
        const {
          payload: { users },
        } = action;
        draft.users = {
          user: users.usersWithData,
          prefetched: [],
          end: false,
          next: users.next,
          loading: false,
        };
      });
    },
    [UsersActionType.PREFETCH_USERS_LIST_SUCCESS]: (
      state,
      action: ListType.UsersListAction
    ) => {
      return produce(state, draft => {
        if (action.payload === undefined) return;
        const {
          payload: { users },
        } = action;
        draft.users.prefetched = users.usersWithData;
        draft.users.next = users.next;
        if (users.usersWithData && users.usersWithData.length === 0) {
          draft.users.end = true;
        }
      });
    },
  },
  initialState
);
