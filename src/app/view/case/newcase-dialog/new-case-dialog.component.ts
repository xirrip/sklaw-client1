import {Component, OnInit} from '@angular/core';
import {LawCase} from '../../../model/lawcase';
import {LawClient} from '../../../model/lawclient';
import {FormControl, Validators} from '@angular/forms';
import {ClientService} from '../../../service/client.service';

@Component({
  selector: 'app-newcase-dialog',
  templateUrl: './new-case-dialog.component.html',
  styleUrls: ['./new-case-dialog.component.css']
})
export class NewCaseDialogComponent implements OnInit {

  lawClient: LawClient;
  lawCase: LawCase;
  newClientEntryToggle: boolean;

  selectedClient: LawClient;
  allClients: LawClient[];

  // TODO learn about reactive forms...
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  constructor(private _clientService: ClientService) {
    this.lawClient = new LawClient();
    this.lawCase = new LawCase();
    this.newClientEntryToggle = false;

    this.allClients = [];
  }

  ngOnInit() {
    this._clientService.getClients().subscribe( (clients: LawClient[]) => this.allClients = clients.sort(
      (a: LawClient, b: LawClient) => (a.lastName + ' ' + a.firstName).localeCompare(b.lastName + ' ' + b.firstName)
    ) );
  }

}
