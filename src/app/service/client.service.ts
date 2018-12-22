import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { LawClient } from '../model/lawclient';
import {LawCase} from '../model/lawcase';

/**
 * https://angular.io/guide/http
 * https://angular.io/tutorial/toh-pt6
 */

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) {
  }

  private clientsUrl = 'http://localhost:8082/clients';

  getClients(): Observable<LawClient[]> {
    return this.http.get<LawClient[]>(this.clientsUrl);
  }

  createClient(lawClient: LawClient): Observable<LawClient> {
    return this.http.post<LawClient>(this.clientsUrl, lawClient);
  }

  createCase(lawClient: LawClient, lawCase: LawCase): Observable<LawCase> {
    return this.http.post<LawCase>(this.clientsUrl + '/' + lawClient.id + '/cases', lawCase);
  }

}
