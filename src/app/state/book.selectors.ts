import { createSelector, createFeatureSelector } from '@ngrx/store';

import { AppState } from './app.state';
import { Book } from '../components/book-list/book.model';

export const selectBooks = createSelector<any, any,Array<Book>>(
  (state: AppState) => state.books,
  (books: Array<Book>) => books,
);

export const selectCollectionState = createFeatureSelector<
  AppState,
  Array<string>
>('collection');

export const selectBookCollection = createSelector<any, any, any, any>(
  selectBooks,
  selectCollectionState,
  (books: Array<Book>, collection: Array<string>) => {
    return collection.map((id) => books.find((book) => book.id === id));
  }
);