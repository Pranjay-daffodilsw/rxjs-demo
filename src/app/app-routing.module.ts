import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SampleComponent } from './components/sample/sample.component';
import { RxjsExampleComponent } from './components/rxjs-example/rxjs-example.component';
import { LifecycleComponent } from './components/lifecycle/lifecycle.component';
import { AuthGuard } from './services/auth.guard';
import { SinglePostComponent } from './components/posts/single-post/single-post.component';

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
      .then(m => m.PostsModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'posts/details/:id',
    component: SinglePostComponent,
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module')
      .then(m => m.AuthModule)
  },
  {
    path: 'media',
    loadChildren: () => import('./components/media/media.module').then(m => m.MediaModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
