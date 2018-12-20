import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {catchError, map, retry, tap} from 'rxjs/operators';

import { LawClient } from '../model/lawclient';

/**
 * https://angular.io/guide/http
 * https://angular.io/tutorial/toh-pt6
 */

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  private clientsUrl = 'http://localhost:8082/clients';

  getClients(): Observable<LawClient[]> {
    return this.http.get<LawClient[]>(this.clientsUrl);
  }

}
