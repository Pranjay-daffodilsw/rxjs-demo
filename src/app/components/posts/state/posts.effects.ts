import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Update } from "@ngrx/entity";
import { RouterNavigatedAction, ROUTER_NAVIGATED } from "@ngrx/router-store";
import { filter, map, mergeMap, switchMap, tap } from "rxjs/operators";
import { Post } from "src/app/models/posts.model";
import { PostsService } from "src/app/services/posts.service";
import { RouterStateUrl } from "src/app/state/router/custom-serializer";
import { addPost, addPostSuccess, deletePost, deletePostSuccess, loadPosts, loadPostsSuccess, updatePost, updatePostSuccess } from "./posts.action";

@Injectable()
export class PostsEffects {
  constructor(
    private actions$: Actions,
    private postService: PostsService,
    private router: Router,
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
                const updatedPost: Update<Post> = {
                  id: action.post.id,
                  changes: {
                    ...action.post,
                  }
                };
                return updatePostSuccess({ post: updatedPost })
              })
            )
        })
      )
    }
  )

  updatePostSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(updatePostSuccess),
        tap((action) => {
          this.router.navigate(['posts']);
        })
      )
    },
    { dispatch: false }
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

  getSinglePost = createEffect(() => {
    return this.actions$.pipe(
      ofType(ROUTER_NAVIGATED),
      filter((r: RouterNavigatedAction<RouterStateUrl>) => {
        return r.payload.routerState.url.startsWith('/posts/details/')
      }),
      map((r: RouterNavigatedAction<RouterStateUrl>) => {
        return r.payload.routerState['params'].id
      }),
      switchMap((id) => {
        return this.postService.getPostById(id)
          .pipe(map(post => {
            const postData = [{ ...post, id }]
            return loadPostsSuccess({ posts: postData })
          }))
      })
    )
  })


}