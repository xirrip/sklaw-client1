import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import { Cookie } from 'ng2-cookies';
import { HttpClient, HttpHeaders, HttpResponse,  } from '@angular/common/http';

import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {TokenResponse} from './token-response';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  private refreshTokenCall;

  constructor(private _router: Router, private _http: HttpClient) { }

  // TODO change to login service, returning user as Observable
  obtainAccessToken(loginData, onSuccess, onFail) {
    this._http.post<TokenResponse>('http://127.0.0.1:8082/auth/login', loginData, { withCredentials: true })
      .pipe()
      .subscribe(
        data => {
          this.saveToken(data);
          console.log(Cookie.get('access_token'));
          onSuccess(); },
        err => onFail()
      );
  }

  saveToken(token: TokenResponse) {
    const expireDate = new Date().getTime() + (1000 * token.expires_in);
    Cookie.set( 'access_token', token.access_token, expireDate);
    console.log('Saved Access token: ' + Cookie.get('access_token'));
  }

  checkCookie() {
    this._http.get('http://127.0.0.1:8082/auth/checkCookie', { withCredentials: true })
      .pipe()
      .subscribe(
        data => { console.log('checked cookie...'); },
        err => {}
      );

  }

  checkCredentials() {
    if (!Cookie.check('access_token')) {
      this._router.navigate(['/login']);
    }
  }

  logout() {
    Cookie.delete('access_token');
    this._router.navigate(['/login']);
  }

  getToken(): string {
    if (Cookie.get('access_token')) {
      return Cookie.get('access_token');
    }
    return '';
  }

  refreshToken(): Observable<string> {
    return this._http.get<TokenResponse>('http://127.0.0.1:8082/auth/refresh', { withCredentials: true })
      .pipe(
        map(token => {
          this.saveToken(token);
          return token.access_token;
        }));
  }

}
