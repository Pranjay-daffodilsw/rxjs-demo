import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { catchError, exhaustMap, map, tap } from "rxjs/operators";
import { User } from "src/app/models/user.model";
import { AuthService } from "src/app/services/auth.service";
import { setErrorMessage, setLoadingSpinner } from "src/app/state/shared/shared.actions";
import { autoLogin, loginFail, loginStart, loginSucess, logout, signupStart, signupSuccess } from "./auth.actions";

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private store: Store,
    private router: Router,
  ) { }


  autoLogin = createEffect(() => {
    return this.actions$.pipe(
      ofType(autoLogin),
      exhaustMap((action) => {
        const user = this.authService.getUserFromLocalStorage()
        console.log(user);

        return of(loginSucess({ user: user!, redirect: false }))
      })
    )
  });

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart),
      exhaustMap((action) => {
        return this.authService.login(action.email, action.password)
          .pipe(
            map((data) => {
              const user = this.authService.formatUser(data);
              this.authService.setUserInLocalStorage(user);
              return loginSucess({ user, redirect: true });
            }),
            catchError((errorResponse) => {
              const message = this.authService.formatLoginErrorMessage(errorResponse?.error?.error?.message);
              this.store.dispatch(setLoadingSpinner({ status: false }));
              this.store.dispatch(loginFail());
              return of(setErrorMessage({ message }));
            })
          )
      })
    )
  })

  logout$ = createEffect(() => {
    return this.actions$.pipe(ofType(logout), map(action => {
      this.authService.logout();
      this.router.navigate(['auth']);
    }))
  }, { dispatch: false })


  authSuccessRedirect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(...[loginSucess, signupSuccess]),
      tap((action) => {
        this.store.dispatch(setLoadingSpinner({ status: false }));
        if (action.redirect) {
          this.router.navigate(['/']);
        }
        this.store.dispatch(setErrorMessage({ message: '' }));
      })
    )
  }, { dispatch: false })

  signup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(signupStart),
      exhaustMap((action) => {
        return this.authService.signUp(action.email, action.password)
          .pipe(
            map((data) => {
              this.store.dispatch(setLoadingSpinner({ status: false }));
              this.store.dispatch(setErrorMessage({ message: '' }));
              const user = this.authService.formatUser(data);
              return signupSuccess({ user, redirect: true });
            }),
            catchError((errorResponse) => {
              const message = this.authService.formatSignupErrorMessage(errorResponse?.error?.error?.message);
              this.store.dispatch(setLoadingSpinner({ status: false }));
              // this.store.dispatch(loginFail());
              return of(setErrorMessage({ message }));
            })
          )
      })
    )
  });

}