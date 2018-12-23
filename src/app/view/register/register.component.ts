import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthorizationService} from '../../service/authorization.service';
import {catchError, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {User} from '../../model/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router, private authorizationService: AuthorizationService) {
  }

  register_username: string
  register_email: string
  register_password: string

  register(): void {


    const registerData = new User(this.register_username, this.register_email, this.register_password);
    this.authorizationService.registerUser(registerData)
      .subscribe(
        _ => alert('User registered'),
        err => alert('User registration error')
      );
  }

  ngOnInit() {
  }

}
