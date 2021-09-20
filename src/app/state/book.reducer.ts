import { createReducer, on, Action } from '@ngrx/store';

import { retrievedBookList } from './book.actions';
import { Book } from '../components/book-list/book.model';

export const initialState: ReadonlyArray<Book> = [];

export const booksReducer = createReducer(
  initialState,
  on(retrievedBookList, (state, { books }) => [...books])
)

