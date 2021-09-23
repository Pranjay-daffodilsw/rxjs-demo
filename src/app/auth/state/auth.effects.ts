import { Injectable } from "@angular/core";
import { Actions, createEffect, Effect, ofType } from "@ngrx/effects";
import { exhaustMap, map } from "rxjs/operators";
import { AuthService } from "src/app/services/auth.service";
import { loginStart, loginSucess } from "./auth.actions";

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
  ) { }

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart),
      exhaustMap((action) => {
        return this.authService.login(action.email, action.password)
          .pipe(map((data) => {
            const user = this.authService.formatUser(data);
            return loginSucess({ user });
          }))
      })
    )
  })
}