import { createSelector } from 'reselect'
import { isTokenValid } from '../lib/auth0';

const tokenSelector = state => state.auth.token

export const isAuthenticated = createSelector(
  tokenSelector,
  isTokenValid,
);
