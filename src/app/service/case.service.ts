import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {LawCase} from '../model/lawcase';
import {flatMap} from 'rxjs/operators';
import {ClientService} from './client.service';
import {LawClient} from '../model/lawclient';
import {LawTask} from '../model/law-task';

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
            cases.map((c: LawCase) => this._clientService.getClient(c.mainClient.id).subscribe(theClient => c.mainClient = theClient));
            return of(cases);
          }
        )
      );
  }

  getCase(id: number): Observable<LawCase> {
    return this._http.get<LawCase>(this.casesUrl + '/' + id);
    /*
      .pipe(
        flatMap(
          (aCase: LawCase) => {
            this._clientService.getClient(aCase.mainClient.id).subscribe(c => aCase.mainClient = c);
            return of(aCase);
          }
        )
      );
    */
  }

  updateCase(lawCase: LawCase): Observable<LawCase> {
    return this._http.put<LawCase>(this.casesUrl + '/' + lawCase.id, lawCase);
  }

  createTask(lawCase: LawCase, lawTask: LawTask): Observable<LawTask> {
    return this._http.post<LawTask>(this.casesUrl + '/' + lawCase.id + '/tasks', lawTask);
  }

  getTasks(id: number): Observable<LawTask[]> {
    return this._http.get<LawTask[]>(this.casesUrl + '/' + id + '/tasks');
  }

}


