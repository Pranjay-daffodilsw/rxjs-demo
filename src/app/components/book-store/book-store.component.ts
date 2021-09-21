import { Component, OnInit } from '@angular/core';
import { Store, select, Selector } from '@ngrx/store';
import { Observable } from 'rxjs';

import { selectBookCollection, selectBooks, selectCollectionState } from '../../state/book.selectors';
import { retrievedBookList, addBook, removeBook } from '../../state/book.actions';
import { BooksListService } from '../../components/book-list/books-list.service';
import { Book } from '../../components/book-list/book.model';

@Component({
  selector: 'app-book-store',
  templateUrl: './book-store.component.html',
  styleUrls: ['./book-store.component.less']
})
export class BookStoreComponent implements OnInit {

  books$ = this.store.pipe(select(selectBooks))
  bookCollection$: Observable<Array<Book>> = this.store.pipe(select(selectBookCollection));

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