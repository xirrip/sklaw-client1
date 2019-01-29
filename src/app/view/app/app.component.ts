import {Component } from '@angular/core';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {AuthorizationService} from '../../service/authorization.service';
import {MatDialog} from '@angular/material';
import {NewcaseDialogComponent} from '../case/newcase-dialog/newcase-dialog.component';
import {ClientService} from '../../service/client.service';
import {LawClient} from '../../model/lawclient';
import {flatMap, tap} from 'rxjs/operators';
import {LawCase} from '../../model/lawcase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SkunkLaw - the stinkiest';
  user: string;

  constructor(private _authService: AuthorizationService,
              public dialog: MatDialog,
              private _clientService: ClientService) {

  }

  isLoggedIn(): boolean {
    this.user = Cookie.get('username');
    return (this.user !== null && this.user !== '');
  }

  logout() {
    this._authService.logout();
  }

  createNewCase() {
    const createNewCaseDialog = this.dialog.open(NewcaseDialogComponent, {
      width: '600px',
      data: 'data to be passed in'
    });

    /**
     * https://blog.danieleghidoli.it/2016/10/22/http-rxjs-observables-angular/
     */
    createNewCaseDialog.afterClosed().subscribe( result => {
      console.log(`dialog closed: ${result}`);
      if (result) {
        if (createNewCaseDialog.componentInstance.newClientEntryToggle) {
            this._clientService.createClient(createNewCaseDialog.componentInstance.lawClient)
              .pipe(
                tap((client: LawClient) => console.log('client created: ' + client.id)),
                flatMap((client: LawClient) => this._clientService.createCase(client, createNewCaseDialog.componentInstance.lawCase)
              ))
            .subscribe(
              (lawCase: LawCase) => console.log('case created: ' + lawCase.id),
              err => console.log('could not create case! ' + err)
            );
        } else {
          this._clientService.createCase(
            createNewCaseDialog.componentInstance.selectedClient,  createNewCaseDialog.componentInstance.lawCase)
            .subscribe(
              (lawCase: LawCase) =>
                console.log(`case ${lawCase.id} created for existing client.`),
              err => console.log('could not create case.')
            );
        }
      }
    });

  }
}
