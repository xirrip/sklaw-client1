import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ClientService} from '../../../service/client.service';
import {Observable} from 'rxjs';
import {LawClient} from '../../../model/lawclient';

/**
 * https://material.angular.io/components/table/examples
 */

@Component({
  selector: 'app-user',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
  export class ClientListComponent implements OnInit {

  clients: LawClient[] = [];

  /*
  displayedColumns = ['id', 'nickName', 'firstName', 'lastName'];

  dataSource = new MatTableDataSource();
  */

  constructor(private _router: Router, private _clientService: ClientService) {
  }

  ngOnInit(): void {
    console.log('getting clients');
    this._clientService.getClients().subscribe((data: LawClient[]) => this.clients = data,
      error => this.clients = []);
  }

}
