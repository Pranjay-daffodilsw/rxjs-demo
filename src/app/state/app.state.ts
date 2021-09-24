import { ActionReducerMap } from '@ngrx/store';
import { Book } from '../models/book.model';
import { postsReducer } from '../components/posts/state/posts.reducer';
import { PostsState } from '../components/posts/state/posts.state';
import { booksReducer } from './book.reducer';
import { collectionReducer } from './collection.reducer';
import { SHARED_STATE_NAME } from './shared/shared.selectors';
import { SharedState } from './shared/shared.state';
import { SharedReducer } from './shared/shared.reducers';

export interface BookStore {
  books: ReadonlyArray<Book>;
  collection: ReadonlyArray<string>;
}

export interface AppState {
  bookStore: BookStore;
  [SHARED_STATE_NAME]: SharedState;
}


export const appReducer: ActionReducerMap<any> = {
  [SHARED_STATE_NAME]: SharedReducer
}