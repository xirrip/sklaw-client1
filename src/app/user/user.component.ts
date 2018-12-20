import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {Router} from '@angular/router';
import {UserService} from '../service/user.service';
import {of} from 'rxjs';

/**
 * https://material.angular.io/components/table/examples
 */

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  displayedColumns = ['id', 'nickName', 'firstName', 'lastName'];

  dataSource = new MatTableDataSource();
  constructor(private _router: Router, private userService: UserService) {
    console.log('user component constructor.');
  }

  ngOnInit(): void {
    console.log('getting users');

    this.userService.getClients().subscribe(
      data => {
        console.log('getting client data...');
        this.dataSource.data = data;
      },
      error => {
        console.log('error getting users');
        this._router.navigate(['/login']);
      }
    );
  }

}
