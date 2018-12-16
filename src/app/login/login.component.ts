import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthorizationService} from '../service/authorization.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private authorizationService: AuthorizationService) {
  }

  username: string
  password: string

  login(): void {

    const loginData = { username: this.username, password: this.password };
    this.authorizationService.obtainAccessToken(loginData, this.onSuccess.bind(this), this.onFail.bind(this));

    // TODO catch login error...???
  }

  ngOnInit() {
  }

  onSuccess(): void {
    console.log('Login successful!');
    this.router.navigate(['user']);
  }

  onFail(): void {
    alert('Login failed.');
  }

}
