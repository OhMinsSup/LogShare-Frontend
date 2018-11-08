import { createSelector } from 'reselect';
import { StoreState } from '../../modules';

export const authExistsSelector = createSelector(
  (state: StoreState) => state.auth.exists,
  exists => exists
);

export const authRegisterFormSelector = createSelector(
  (state: StoreState) => state.auth.register_form,
  register_form => register_form
);

export const authLoginFormSelector = createSelector(
  (state: StoreState) => state.auth.login_form,
  login_form => login_form
);
