import { handleActions } from 'redux-actions';
import produce from 'immer';
import { GenericResponseAction } from 'src/lib/common';

export enum ErrorActionType {
  ERROR = 'error/ERROR',
}

type ErrorAction = GenericResponseAction<
  { error: boolean; status: number | null },
  string
>;

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
    [ErrorActionType.ERROR]: (state, action: ErrorAction) => {
      return produce(state, draft => {
        if (action.payload === undefined) return;
        const {
          payload: { status, error },
        } = action;
        draft.code = status;
        draft.error = error;
      });
    },
  },
  initialState
);
