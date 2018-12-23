import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import {LoginComponent} from '../view/login/login.component';
import {ClientListComponent} from '../view/client-list/client-list.component';
import {RegisterComponent} from '../view/register/register.component';
import {AdminGuard} from './admin.guard';
import {RoleGuard} from './role.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent, canActivate: [RoleGuard], data: { expectedRole: 'admin'} },

  { path: 'clients', component: ClientListComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]

})
export class AppRoutingModule { }
