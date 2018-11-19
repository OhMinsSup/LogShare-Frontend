import { handleActions } from 'redux-actions';
import produce from 'immer';
import * as ErrorType from './types/error';

export enum ErrorActionType {
  ERROR = 'error/ERROR',
}

export interface ErrorState {
  code: number | null;
  error: boolean;
}

const initialState: ErrorState = {
  code: null,
  error: false,
};

export default handleActions<ErrorState, any>(
  {
    [ErrorActionType.ERROR]: (state, action: ErrorType.ErrorAction) => {
      return produce(state, draft => {
        draft.code = action.payload.status;
        draft.error = action.payload.error;
      });
    },
  },
  initialState
);
