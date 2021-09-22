import { createSelector, createFeatureSelector } from '@ngrx/store';

import { AppState, BookStore } from './app.state';
import { Book } from '../models/book.model';

export const selectBooks = createSelector<any, any, Array<Book>>(
  (state: AppState) => state.bookStore.books,
  (books: Array<Book>) => books,
);

export const selectCollectionState = createSelector<any, any, any>(
  (state: AppState) => state.bookStore.collection,
  (collection: Array<Book>) => collection
);

export const selectBookCollection = createSelector<any, any, any, any>(
  selectBooks,
  selectCollectionState,
  (books: Array<Book>, collection: Array<string>) => {
    return collection.map((id) => books.find((book) => book.id === id));
  }
);