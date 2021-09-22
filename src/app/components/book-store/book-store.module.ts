import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { StoreModule } from "@ngrx/store";
import { booksReducer } from "src/app/state/book.reducer";
import { collectionReducer } from "src/app/state/collection.reducer";
import { BookCollectionComponent } from "./book-collection/book-collection.component";
import { BooksListComponent } from "./book-list/book-list.component";
import { BookStoreComponent } from "./book-store.component";
import { BooksListService } from "./books-list.service";

const routes: Routes = [
  {
    path: '',
    component: BookStoreComponent
  }
]

@NgModule({
  declarations: [
    BookStoreComponent,
    BookCollectionComponent,
    BooksListComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('bookStore', {
      books: booksReducer,
      collection: collectionReducer,
    })
  ],
  providers: [
    BooksListService,
  ]
})
export class BookStoreModule {

}