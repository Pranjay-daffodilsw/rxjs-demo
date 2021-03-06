import { createFeatureSelector, createSelector } from "@ngrx/store"
import { SharedState } from "./shared.state"


export const SHARED_STATE_NAME = 'shared'


const getSharedState = createFeatureSelector<SharedState>(SHARED_STATE_NAME)

export const getLoading = createSelector(getSharedState, (s) => {
  return s.showLoading;
})

export const getErrorMessage = createSelector(getSharedState, (s) => {
  return s.errorMessage;
})