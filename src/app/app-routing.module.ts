import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SampleComponent } from './components/sample/sample.component';
import { RxjsExampleComponent } from './components/rxjs-example/rxjs-example.component';
import { LifecycleComponent } from './components/lifecycle/lifecycle.component';

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
    loadChildren: () => import('./components/book-store/book-store.module')
      .then(m => m.BookStoreModule)
  },
  {
    path: 'lifeCycle',
    component: LifecycleComponent
  },
  {
    path: 'posts',
    loadChildren: () => import('./components/posts/posts.module')
      .then(m => m.PostsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
