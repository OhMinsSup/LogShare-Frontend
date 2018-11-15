import { handleActions } from 'redux-actions';
import produce from 'immer';
import * as ErrorType from './types/error';

export enum ErrorActionType {
  ERROR = 'error/ERROR',
}

export interface ErrorValueState {
  text: string | null;
  code: number | null;
}

export interface ErrorState {
  error: ErrorValueState | null;
}

const initialState: ErrorState = {
  error: null,
};

export default handleActions<ErrorState, any>(
  {
    [ErrorActionType.ERROR]: (state, action: ErrorType.ErrorAction) => {
      return produce(state, draft => {
        draft.error = {
          text: action.payload.statusText,
          code: action.payload.status,
        };
      });
    },
  },
  initialState
);
