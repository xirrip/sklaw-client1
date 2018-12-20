import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpSentEvent,
  HttpHeaderResponse,
  HttpProgressEvent, HttpResponse, HttpUserEvent, HttpErrorResponse
} from '@angular/common/http';

import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, filter, finalize, map, mergeMap, switchMap, take, tap} from 'rxjs/operators';
import {AuthorizationService} from '../service/authorization.service';
import {User} from '../model/user';

@Injectable({
  providedIn: 'root'
})

/**
 * http://ericsmasal.com/2018/07/02/angular-6-with-jwt-and-refresh-tokens-and-a-little-rxjs-6/
 * https://github.com/SyntakSoftware/ApothecaricNgUI
 *
 * below i think without the user dependency
 * https://github.com/IntertechInc/http-interceptor-refresh-token/blob/master/src/app/request-interceptor.service.ts
 */
export class JwtInterceptor implements HttpInterceptor {
  constructor(private _authorizationService: AuthorizationService) { }

  isRefreshingToken = false;
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  intercept(request: HttpRequest<any>, next: HttpHandler):
    Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any> | any> {

    if (request.url.includes('/auth/login') || request.url.includes('/auth/refresh')) {
      return next.handle(request);
    }

    return next.handle(this.addTokenToRequest(request, this._authorizationService.getToken()))
      .pipe(
        catchError(err => {
          if (err instanceof HttpErrorResponse) {
            switch ((<HttpErrorResponse>err).status) {
              case 401:
                return this.handle401Error(request, next);
              case 400:
                return <any>this._authorizationService.logout();
            }
          } else {
            return throwError(err);
          }
        }));
  }

  private addTokenToRequest(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({ setHeaders: { Authorization: `Bearer ${token}`}});
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {

    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;

      // Reset here so that the following requests wait until the token
      // comes back from the refreshToken call.
      this.tokenSubject.next(null);

      return this._authorizationService.refreshToken()
        .pipe(
          switchMap((token: string) => {
            if (token) {
              this.tokenSubject.next(token);
              // already saved in refresh token call
              // localStorage.setItem('currentUser', JSON.stringify(user));
              return next.handle(this.addTokenToRequest(request, token));
            }

            return <any>this._authorizationService.logout();
          }),
          catchError(err => {
            return <any>this._authorizationService.logout();
          }),
          finalize(() => {
            this.isRefreshingToken = false;
          })
        );
    } else {
      this.isRefreshingToken = false;

      return this.tokenSubject
        .pipe(filter(token => token != null),
          take(1),
          switchMap(token => {
            return next.handle(this.addTokenToRequest(request, token));
          }));
    }
  }
}

