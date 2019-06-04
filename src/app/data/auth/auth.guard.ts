import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';
import { OidcFacade } from 'ng-oidc-client';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private oidcFacade: OidcFacade
  ) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.oidcFacade.waitForAuthenticationLoaded().pipe(
        switchMap(loading => {
          return this.oidcFacade.identity$.pipe(
            first(),
            switchMap(user => {
              if (user && !user.expired) {
                return of(true);
              } else {
                this.router.navigate(['/login']);
                return of(false);
              }
            })
          );
        })
      );
  }
}
