import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthorizationService} from '../../../service/authorization.service';
import {User} from '../../../model/user';

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

    const loginData = new User(this.username, null, this.password);
    this.authorizationService.login(loginData)
      .subscribe(
        user => {
          console.log('Login successful!');
          this.router.navigate(['clients']);
        },
        _ => alert('Login failed!')
      );
  }

  ngOnInit() {
  }

  onSuccess(): void {
    console.log('Login successful!');
    this.router.navigate(['clients']);
  }

  onFail(): void {
    alert('Login failed.');
  }

}
