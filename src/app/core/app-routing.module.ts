import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from '../view/login/login.component';
import {ClientListComponent} from '../view/client-list/client-list.component';
import {RegisterComponent} from '../view/register/register.component';
import {RoleGuard} from './role.guard';
import {CaseListComponent} from '../view/case-list/case-list.component';
import {ClientDetailsComponent} from '../view/client-details/client-details.component';
import {CaseDetailsComponent} from '../view/case-details/case-details.component';
import {TagSearchComponent} from '../view/tag-search/tag-search.component';

const routes: Routes = [
  { path: '', component: LoginComponent },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent, canActivate: [RoleGuard], data: { expectedRole: 'admin'} },

  { path: 'clients', component: ClientListComponent },
  { path: 'cases', component: CaseListComponent },

  { path: 'clients/:id', component: ClientDetailsComponent },
  { path: 'cases/:id', component: CaseDetailsComponent },

  { path: 'tags', component: TagSearchComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]

})
export class AppRoutingModule { }
