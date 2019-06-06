import { Injectable } from '@angular/core';
import { OidcFacade } from 'ng-oidc-client';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  static OidcInterceptorService: any;

  constructor(
    private oidcFacade: OidcFacade
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.oidcFacade.identity$.pipe(
      switchMap(user => {
        if (user && user.access_token) {
          req = req.clone({
            setHeaders: {
              Authorization: `Bearer ${user.access_token}`
            }
          });
        }

        return next.handle(req).pipe(catchError(error => this.errorHandler(error)));
      })
    );
  }

  private errorHandler(response: HttpEvent<any>): Observable<HttpEvent<any>> {
    throw response;
  }
}
