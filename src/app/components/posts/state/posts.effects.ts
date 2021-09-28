import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, mergeMap, switchMap } from "rxjs/operators";
import { PostsService } from "src/app/services/posts.service";
import { addPost, addPostSuccess, deletePost, deletePostSuccess, loadPosts, loadPostsSuccess, updatePost, updatePostSuccess } from "./posts.action";

@Injectable()
export class PostsEffects {
  constructor(
    private actions$: Actions,
    private postService: PostsService,
  ) {

  }

  loadPosts$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loadPosts),
        mergeMap((action) => {
          return this.postService.getPosts().pipe(
            map((data) => {
              return loadPostsSuccess({ posts: data })
            })
          )
        })
      )
    }
  )

  addPost$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(addPost),
        mergeMap((action) => {
          return this.postService.addPost(action.post).pipe(
            map((data) => {
              const post = { ...action.post };
              post.id = data.name;
              return addPostSuccess({ post })
            })
          )
        })
      )
    }
  )


  updatePost$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(updatePost),
        switchMap((action) => {
          return this.postService
            .updatePost(action.post)
            .pipe(
              map((data: any) => {
                const post: any = {};
                for (const key in data) {
                  post.id = key;
                  post.title = data[key].title;
                  post.description = data[key].description;
                }
                return updatePostSuccess({ post })
              })
            )
        })
      )
    }
  )

  deletePost$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(deletePost),
        switchMap((action) => {
          return this.postService
            .deletePost(action.id)
            .pipe(
              map(data => {
                return deletePostSuccess({ id: action.id })
              })
            )
        })
      )
    }
  )




}