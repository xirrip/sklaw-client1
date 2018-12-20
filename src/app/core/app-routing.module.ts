import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import {LoginComponent} from '../login/login.component';
import {UserComponent} from '../user/user.component';
import {RegisterComponent} from '../register/register.component';
import {AdminGuard} from './admin.guard';
import {RoleGuard} from './role.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'user', component: UserComponent },
  { path: 'register', component: RegisterComponent, canActivate: [RoleGuard], data: { expectedRole: 'admin'} },
  { path: '', component: LoginComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]

})
export class AppRoutingModule { }
