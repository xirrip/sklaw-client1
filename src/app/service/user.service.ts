import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { LawClient } from '../model/lawclient';
import {AuthorizationService} from './authorization.service';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

/**
 * https://angular.io/guide/http
 * https://angular.io/tutorial/toh-pt6
 */

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private authorizationService: AuthorizationService) {}

  private clientsUrl = 'http://localhost:8082/clients';

  getClients (): Observable<LawClient[]> {

    return this.authorizationService.getResource<LawClient[]>(this.clientsUrl);

    /*
    return this.http.get<LawClient[]>(this.clientsUrl)
      .pipe(
        tap(_ => this.log('fetched clients')),
        catchError(this.handleError('getClients', []))
      );
    */
  }


  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    // this.messageService.add(`HeroService: ${message}`);
    console.log(`ClientService: ${message}`);
  }
}
