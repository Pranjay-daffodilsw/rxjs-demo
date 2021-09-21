import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SampleComponent } from './components/sample/sample.component';
import { RxjsExampleComponent } from './components/rxjs-example/rxjs-example.component';
import { LifecycleComponent } from './components/lifecycle/lifecycle.component';
import { BookStoreComponent } from './components/book-store/book-store.component';
import { PostsListComponent } from './components/posts/posts-list/posts-list.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'sample',
    component: SampleComponent
  },
  {
    path: 'rxjs',
    component: RxjsExampleComponent
  },
  {
    path: 'books',
    component: BookStoreComponent
  },
  {
    path: 'lifeCycle',
    component: LifecycleComponent
  },
  {
    path: 'posts',
    component: PostsListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
