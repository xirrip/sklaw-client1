import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import { Cookie } from 'ng2-cookies';
import { HttpClient, HttpHeaders, HttpResponse,  } from '@angular/common/http';

import { Observable } from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {LawClient} from '../model/lawclient';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(private _router: Router, private _http: HttpClient) { }

  obtainAccessToken(loginData, onSuccess, onFail) {

    // lets try a different param object
    const params = {
      grant_type: 'password',
      username: loginData.username,
      password: loginData.password,
      client_id: 'fooClientIdPassword'
    };

    const body = this.objectToURLEncoded(params);

    /*
    const params = new URLSearchParams();
    params.append('username', loginData.username);
    params.append('password', loginData.password);
    params.append('grant_type', 'password');
    params.append('client_id', 'fooClientIdPassword');
    */

    console.log('Parameters = ' + params.toString());

    let headers = new HttpHeaders();
    headers = headers.append('Content-type', 'application/x-www-form-urlencoded; charset=utf-8');
    headers = headers.append('Accept', 'application/json');
    const base64Credential: string = btoa( 'fooClientIdPassword:secret');
    headers = headers.append('Authorization', 'Basic ' + base64Credential);

    this._http.post('http://localhost:8081/spring-security-oauth-server/oauth/token', body, { headers: headers })
      .pipe( /*map((res: any) => {console.log(res); return res.json(); } ) */)
          .subscribe(
          data => { this.saveToken(data); onSuccess(); },
          err => onFail()
        );


    /*
    const headers = new Headers({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      'Authorization': 'Basic ' + btoa('fooClientIdPassword:secret')});
    const options = new RequestOptions({ headers: headers });
    this._http.post('http://localhost:8081/spring-security-oauth-server/oauth/token', params.toString(), options)
      .map(res => res.json())
      .subscribe(
        data => this.saveToken(data),
        err => alert('Invalid Credentials')
      );
    */

  }

  saveToken(token) {
    const expireDate = new Date().getTime() + (1000 * token.expires_in);
    Cookie.set( 'access_token', token.access_token, expireDate);
    console.log('Obtained Access token');
    this._router.navigate(['/']);
  }

  getResource<T>(resourceUrl): Observable<T> {

    this.checkCredentials();

    let headers = new HttpHeaders();
    // headers = headers.append('Content-type', 'application/x-www-form-urlencoded; charset=utf-8');
    headers = headers.append('Accept', 'application/json');
    headers = headers.append('Authorization', 'Bearer ' + Cookie.get('access_token'));

    /*
    const headers = new Headers({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      'Authorization': 'Bearer ' + Cookie.get('access_token')});
    const options = new RequestOptions({ headers: headers });
    */

    const result =
      this._http.get<T>(resourceUrl, { headers: headers })
        .pipe(
          tap( _ => console.log('fetched data with oauth')),
          catchError((error: any) => Observable.throw(error.json().error || 'Server error'))
        );
    return result;
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

  private objectToURLEncoded(object) {
    return Object.keys(object).map(function (key) {
      return encodeURIComponent(key) + '=' + encodeURIComponent(object[key]);
    }).join('&');
  }

}
