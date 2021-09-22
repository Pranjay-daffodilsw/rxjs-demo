import { ActionReducerMap } from '@ngrx/store';
import { Book } from '../models/book.model';
import { postsReducer } from '../components/posts/state/posts.reducer';
import { PostsState } from '../components/posts/state/posts.state';
import { booksReducer } from './book.reducer';
import { collectionReducer } from './collection.reducer';

export interface BookStore {
  books: ReadonlyArray<Book>;
  collection: ReadonlyArray<string>;
}

export interface AppState {
  bookStore: BookStore;
  posts: PostsState;
}


// export const appReducer: ActionReducerMap<AppState, any> = {
//   books: booksReducer,
//   bookStore: {
//     collection: collectionReducer,
//     posts: postsReducer,
//   }
// }