import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { AddPostComponent } from "./add-post/add-post.component";
import { EditPostComponent } from "./edit-post/edit-post.component";
import { PostsListComponent } from "./posts-list/posts-list.component";
import { PostsEffects } from "./state/posts.effects";
import { postsReducer } from "./state/posts.reducer";
import { POST_STATE_KEY } from "./state/posts.state";
import { SinglePostComponent } from './single-post/single-post.component';

const routes: Routes = [
  {
    path: '',
    component: PostsListComponent,
    children: [
      {
        path: 'add',
        component: AddPostComponent
      },
      {
        path: 'edit/:id',
        component: EditPostComponent
      }
    ]
  }
]

@NgModule({
  declarations: [
    PostsListComponent,
    AddPostComponent,
    EditPostComponent,
    SinglePostComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    StoreModule.forFeature(POST_STATE_KEY, postsReducer),
    EffectsModule.forFeature([PostsEffects])
  ]
})
export class PostsModule {

}