import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./auth.state";

export const AUTH_STATE_NAME = 'auth';

export const getAuthState = createFeatureSelector<AuthState>(AUTH_STATE_NAME);

export const isAuthenticated = createSelector(
  getAuthState,
  (s) => {
    return Boolean(s?.user);
  }
)

export const getToken = createSelector(
  getAuthState,
  s => {
    return s.user ? s.user?.userToken : null;
  }
)