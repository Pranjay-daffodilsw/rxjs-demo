import { Action, createReducer, on } from "@ngrx/store"
import { setErrorMessage, setLoadingSpinner } from "./shared.actions"
import { initialSharedState, SharedState } from "./shared.state"

const _sharedReducer = createReducer(
  initialSharedState,
  on(
    setLoadingSpinner,
    (state, action) => {
      return {
        ...state,
        showLoading: action.status
      }
    }),
  on(
    setErrorMessage,
    (state, action) => {
      return {
        ...state,
        errorMessage: action.message
      }
    }
  )
)

export function SharedReducer(state: SharedState, action: Action) {
  return _sharedReducer(state, action)
}