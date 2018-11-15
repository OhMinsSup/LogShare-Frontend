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

export const authResultSelector = createSelector(
  (state: StoreState) => state.auth.authResult,
  authResult => authResult
);

export const tokenDataSelector = createSelector(
  (state: StoreState) => state.auth.tokenData,
  tokenData => tokenData
);

export const verifySocialResultSelector = createSelector(
  (state: StoreState) => state.auth.verifySocialResult,
  verifySocialResult => verifySocialResult
);

export const socialAuthResultSelector = createSelector(
  (state: StoreState) => state.auth.socialAuthResult,
  socialAuthResult => socialAuthResult
);
