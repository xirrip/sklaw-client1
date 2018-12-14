import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {Router} from '@angular/router';
import {UserService} from '../service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  displayedColumns = ['id', 'nickName', 'firstName', 'lastName'];

  dataSource = new MatTableDataSource();
  constructor(private router: Router, private userService: UserService) {
    console.log('user component constructor.');
  }

  ngOnInit(): void {
    console.log('getting users');

    this.userService.getClients().subscribe(
      data => {
        this.dataSource.data = data;
      }
    );
  }

}
