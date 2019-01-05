import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ClientService} from '../../service/client.service';
import {LawClient} from '../../model/lawclient';
import {LawCase} from '../../model/lawcase';
import {CaseService} from '../../service/case.service';

@Component({
  selector: 'app-case-details',
  templateUrl: './case-details.component.html',
  styleUrls: ['./case-details.component.css']
})
export class CaseDetailsComponent implements OnInit {

  _caseId: number;
  lawClient: LawClient;
  lawCase: LawCase;

  constructor(private _router: Router, private _route: ActivatedRoute,
              private _clientService: ClientService, private _caseService: CaseService) {

    this._route.params.subscribe( p => this._caseId = p['id']);

    if (!this._caseId) {
      this._router.navigate(['cases']);
    }
  }

  ngOnInit() {
    this._caseService.getCase(this._caseId).subscribe(c => {
        this.lawCase = c;
        this._clientService.getClient(this.lawCase.mainClientId).subscribe(client => this.lawClient = client)
      },
      error => this._router.navigate(['cases'])
    );
  }

}
