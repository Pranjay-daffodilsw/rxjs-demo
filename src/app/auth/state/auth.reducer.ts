import { createReducer } from "@ngrx/store"
import { AuthState, initialStateAuth } from "./auth.state";

const _authReducer = createReducer(initialStateAuth);

export function AuthReducer(state: AuthState, action) {
  return _authReducer(state, action)
}