import {Component } from '@angular/core';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {AuthorizationService} from './service/authorization.service';
import {MatDialog} from '@angular/material';
import {NewcaseDialogComponent} from './newcase-dialog/newcase-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SkunkLaw - the stinkiest';
  user: string;

  constructor(private _authService: AuthorizationService, public dialog: MatDialog) {

  }

  isLoggedIn(): boolean {
    this.user = Cookie.get('username');
    return (this.user !== null && this.user !== '');
  }

  logout() {
    this._authService.logout();
  }

  createNewCase(){
    const createNewCaseDialog = this.dialog.open(NewcaseDialogComponent, {
      width: '600px',
      data: 'data to be passed in'
    });

    createNewCaseDialog.afterClosed().subscribe( result => {
      console.log(`dialog closed: ${result}`);
    });

  }
}
