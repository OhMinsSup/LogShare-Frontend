import { createSelector } from 'reselect';
import { StoreState } from '../../modules';

export const userSelector = createSelector(
  (state: StoreState) => state.user.user,
  user => user
);
