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
import { HomeComponent } from './components/home/home.component';
import { SampleComponent } from './components/sample/sample.component';
import { BookStoreComponent } from './components/book-store/book-store.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BootStrapModuleImports } from './bootstrapModuleImports';
import { PostsListComponent } from './components/posts/posts-list/posts-list.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { appReducer } from './state/app.state';
import { AddPostComponent } from './components/posts/add-post/add-post.component';

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
    PostsListComponent,
    AddPostComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot(appReducer, {}),
    BrowserAnimationsModule,
    ...BootStrapModuleImports,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [BooksListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
