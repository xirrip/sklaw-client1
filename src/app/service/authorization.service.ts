import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import { Cookie } from 'ng2-cookies';
import { HttpClient, HttpHeaders, HttpResponse,  } from '@angular/common/http';

import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {TokenResponse} from './token-response';
import {User} from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  private refreshTokenCall;

  constructor(private _router: Router, private _http: HttpClient) { }

  // TODO change to login service, returning user as Observable
  login(loginData: User): Observable<User> {
    return this._http.post<TokenResponse>('http://127.0.0.1:8082/auth/login', loginData, { withCredentials: true })
      .pipe(
        tap( _ => console.log('-- authenticated --')),
        map( tokenResponse => {
          this.saveToken(tokenResponse);
          const user = new User(tokenResponse.username, tokenResponse.email, null);
          return user;
        })
      );
  }

  saveToken(token: TokenResponse) {
    const expireDate = new Date().getTime() + (1000 * token.expires_in);
    Cookie.set( 'access_token', token.access_token, expireDate);
    Cookie.set('username', token.username, expireDate);
    Cookie.set('email', token.email, expireDate);
    Cookie.set('grants', token.grants, expireDate);

    console.log('Saved Access token: ' + Cookie.get('access_token'));
  }

  registerUser(registerUser: User): Observable<User> {
    return this._http.post<User>('http://127.0.0.1:8082/account/user/register', registerUser);
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
    Cookie.delete('username');
    Cookie.delete('email');
    Cookie.delete('grants');

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
