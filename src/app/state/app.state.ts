import { ActionReducerMap } from '@ngrx/store';
import { Book } from '../models/book.model';
import { SHARED_STATE_NAME } from './shared/shared.selectors';
import { SharedState } from './shared/shared.state';
import { SharedReducer } from './shared/shared.reducers';
import { AUTH_STATE_NAME } from '../auth/state/auth.selector';
import { AuthReducer } from '../auth/state/auth.reducer';
import { AuthState } from '../auth/state/auth.state';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';

export interface BookStore {
  books: ReadonlyArray<Book>;
  collection: ReadonlyArray<string>;
}

export interface AppState {
  bookStore: BookStore;
  [SHARED_STATE_NAME]: SharedState;
  [AUTH_STATE_NAME]: AuthState;
  router: RouterReducerState;
}


export const appReducer: ActionReducerMap<any> = {
  [SHARED_STATE_NAME]: SharedReducer,
  [AUTH_STATE_NAME]: AuthReducer,
  router: routerReducer,
}