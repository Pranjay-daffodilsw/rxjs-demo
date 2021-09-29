import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { exhaustMap, map } from "rxjs/operators";
import { isAuthenticated } from "../auth/state/auth.selector";
import { AppState } from "../state/app.state";



@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private store: Store<AppState>,
    private router: Router,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.store.select(isAuthenticated)
    .pipe(
      map((authenticate) => {
        if(!authenticate) {
          return this.router.createUrlTree(['auth']);
        } else {
          return true;
        }
      })
    );
  }
}