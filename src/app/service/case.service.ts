import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {LawCase} from '../model/lawcase';
import {flatMap, map, mergeMap, switchMap} from 'rxjs/operators';
import {LawClient} from '../model/lawclient';
import {ClientService} from './client.service';

@Injectable({
  providedIn: 'root'
})
export class CaseService {

  constructor(private _http: HttpClient, private _clientService: ClientService) { }

  private casesUrl = 'http://localhost:8082/cases';


  getCases(): Observable<LawCase[]> {
    return this._http.get<LawCase[]>(this.casesUrl)
      .pipe(
        flatMap(
          (cases: LawCase[]) => {
            cases.map((c: LawCase) => this._clientService.getClient(c.mainClientId).subscribe(theClient => c.mainClient = theClient));
            return of(cases);
          }
        )
      );
  }

  getCase(id: number): Observable<LawCase> {
    return this._http.get<LawCase>(this.casesUrl + '/' + id)
      .pipe(
        flatMap(
          (aCase: LawCase) => {
            this._clientService.getClient(aCase.mainClientId).subscribe(c => aCase.mainClient = c);
            return of(aCase);
          }
        )
      );
  }

  /*
  getCasesOld(): Observable<LawCase[]> {
    return this._http.get<LawCase[]>(this.casesUrl)
      .pipe(
        flatMap(
          (cases: LawCase[]) => {
            cases.forEach(
              c => this._clientService.getClient(c.mainClientId).subscribe(theClient => c.mainClient = theClient)
            );
            return of(cases);
          }
        )
      );
  }
  */
}


