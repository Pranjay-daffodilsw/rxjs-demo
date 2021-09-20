import { Book } from '../components/book-list/book.model';

export interface AppState {
  books: ReadonlyArray<Book>;
  collection: ReadonlyArray<string>;
}