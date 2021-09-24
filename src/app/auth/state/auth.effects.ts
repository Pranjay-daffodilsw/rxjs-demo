import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { catchError, exhaustMap, map, tap } from "rxjs/operators";
import { AuthService } from "src/app/services/auth.service";
import { setErrorMessage, setLoadingSpinner } from "src/app/state/shared/shared.actions";
import { loginFail, loginStart, loginSucess } from "./auth.actions";

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private store: Store,
    private router: Router,
  ) { }

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart),
      exhaustMap((action) => {
        return this.authService.login(action.email, action.password)
          .pipe(
            map((data) => {
              this.store.dispatch(setLoadingSpinner({ status: false }));
              this.store.dispatch(setErrorMessage({ message: '' }));
              const user = this.authService.formatUser(data);
              return loginSucess({ user });
            }),
            catchError((errResponse) => {
              const message = this.authService.formatErrorMessage(errResponse?.error?.error?.message);
              this.store.dispatch(setLoadingSpinner({ status: false }));
              this.store.dispatch(loginFail());
              return of(setErrorMessage({ message }));
            })
          )
      })
    )
  })


  loginRedirect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginSucess),
      tap((action) => {
        this.router.navigate(['/'])
      })
    )
  }, { dispatch: false })

}