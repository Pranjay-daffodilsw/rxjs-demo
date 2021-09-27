import { Action, createReducer, on } from "@ngrx/store"
import { logout, loginSucess, signupSuccess } from "./auth.actions";
import { AuthState, initialStateAuth } from "./auth.state";

const _authReducer = createReducer(
  initialStateAuth,
  on(loginSucess, (state, action) => {
    return {
      ...state,
      user: action.user
    };
  }),
  on(signupSuccess, (state, action) => {
    return {
      ...state,
      user: action.user
    }
  }),
  on(logout, (state, action) => {
    return {
      ...state,
      user: null,
    }
  })
);

export function AuthReducer(state: AuthState, action: Action) {
  return _authReducer(state, action)
}