import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { exhaustMap, map } from "rxjs/operators";
import { AuthService } from "src/app/services/auth.service";
import { setLoadingSpinner } from "src/app/state/shared/shared.actions";
import { loginStart, loginSucess } from "./auth.actions";

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private store: Store,
  ) { }

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart),
      exhaustMap((action) => {
        return this.authService.login(action.email, action.password)
          .pipe(map((data) => {
            this.store.dispatch(setLoadingSpinner({ status: false }))
            const user = this.authService.formatUser(data);
            return loginSucess({ user });
          }))
      })
    )
  })
}