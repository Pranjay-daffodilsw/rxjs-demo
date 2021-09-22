import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { selectBookCollection, selectBooks } from '../../state/book.selectors';
import { retrievedBookList, addBook, removeBook } from '../../state/book.actions';
import { BooksListService } from './books-list.service';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-book-store',
  templateUrl: './book-store.component.html',
  styleUrls: ['./book-store.component.less']
})
export class BookStoreComponent implements OnInit {

  books$ = this.store.pipe(select(selectBooks))
  bookCollection$: Observable<Array<Book>> = this.store.select(selectBookCollection);

  constructor(
    private booksService: BooksListService,
    private store: Store,
  ) {

  }

  ngOnInit(): void {
    this.booksService.getBooks().subscribe({
      next: (books) => {
        this.store.dispatch(retrievedBookList({ books }))
      }
    })
  }

  onAdd(bookId: string) {
    this.store.dispatch(addBook({ bookId }));
  }

  onRemove(bookId: string) {
    this.store.dispatch(removeBook({ bookId }))
  }

}
