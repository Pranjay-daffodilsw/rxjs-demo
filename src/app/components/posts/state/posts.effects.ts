import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, mergeMap } from "rxjs/operators";
import { PostsService } from "src/app/services/posts.service";
import { loadPosts } from "./posts.action";

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
              console.log(data);
            })
          )
        })
      )
    },
    { dispatch: false }
  )




}