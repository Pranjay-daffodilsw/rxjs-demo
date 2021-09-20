import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book } from './book.model';

@Injectable({
  providedIn: 'root',
})
export class BooksListService {
  constructor(
    private http: HttpClient
  ) { }

  getBooks(): Observable<Array<Book>> {
    return this.http
      .get<{ items: Book[] }>(
        'https://www.googleapis.com/books/v1/volumes?maxResults=5&orderBy=relevance&q=oliver%20sacks'
      )
      .pipe(map(books => books.items || []))
  }

  
}