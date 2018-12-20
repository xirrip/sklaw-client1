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

  constructor(private http: HttpClient) {}

  private clientsUrl = 'http://localhost:8082/clients';

  getClients (): Observable<LawClient[]> {
    return this.http.get<LawClient[]>(this.clientsUrl)
      .pipe(
        tap(_ => console.log('fetched clients')),
        catchError(this.handleError('getClients', []))
      );

  }


  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
