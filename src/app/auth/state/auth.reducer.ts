import { Action, createReducer, on } from "@ngrx/store"
import { loginSucess } from "./auth.actions";
import { AuthState, initialStateAuth } from "./auth.state";

const _authReducer = createReducer(
  initialStateAuth,
  on(loginSucess, (state, action) => {
    return {
      ...state,
      user: action.user
    };
  })
);

export function AuthReducer(state: AuthState, action: Action) {
  return _authReducer(state, action)
}