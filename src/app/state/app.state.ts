import { ActionReducerMap } from '@ngrx/store';
import { Book } from '../components/book-list/book.model';
import { postsReducer } from '../components/posts/state/posts.reducer';
import { PostsState } from '../components/posts/state/posts.state';
import { booksReducer } from './book.reducer';
import { collectionReducer } from './collection.reducer';

export interface AppState {
  books: ReadonlyArray<Book>;
  collection: ReadonlyArray<string>;
  posts: PostsState
}

export const appReducer: ActionReducerMap<AppState, any> = {
  books: booksReducer,
  collection: collectionReducer,
  posts: postsReducer,
}