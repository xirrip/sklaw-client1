import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LawClient} from '../../model/lawclient';
import {LawCase} from '../../model/lawcase';
import {ClientService} from '../../service/client.service';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {

  _clientId: number;
  lawClient: LawClient;
  lawCases: LawCase[];

  constructor(private _router: Router, private _route: ActivatedRoute, private _clientService: ClientService) {
    this._route.params.subscribe( p => this._clientId = p['id']);

    if (!this._clientId) {
      this._router.navigate(['clients']);
    }

  }

  ngOnInit() {
    this._clientService.getClient(this._clientId).subscribe(c => this.lawClient = c, error => this._router.navigate(['clients']));
    this._clientService.getCasesForClient(this._clientId).subscribe(c => this.lawCases = c, error => this.lawCases = []);
  }

}
