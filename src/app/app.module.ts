import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookCollectionComponent } from './components/book-collection/book-collection.component';
import { BooksListComponent } from './components/book-list/book-list.component';
import { BooksListService } from './components/book-list/books-list.service';
import { LifecycleComponent } from './components/lifecycle/lifecycle.component';
import { RxjsExampleComponent } from './components/rxjs-example/rxjs-example.component';
import { PeekABooDirective } from './directives/peekABoo.directive';
import { booksReducer } from './state/book.reducer';
import { collectionReducer } from './state/collection.reducer';
import { HomeComponent } from './components/home/home.component';
import { SampleComponent } from './components/sample/sample.component';
import { BookStoreComponent } from './components/book-store/book-store.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    RxjsExampleComponent,
    LifecycleComponent,
    PeekABooDirective,
    BooksListComponent,
    BookCollectionComponent,
    HomeComponent,
    SampleComponent,
    BookStoreComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot({ books: booksReducer, collection: collectionReducer }, {})
  ],
  providers: [BooksListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
