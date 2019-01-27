import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from '../view/account/login/login.component';
import {ClientListComponent} from '../view/client/client-list/client-list.component';
import {RegisterComponent} from '../view/account/register/register.component';
import {RoleGuard} from './role.guard';
import {CaseListComponent} from '../view/case/case-list/case-list.component';
import {ClientDetailsComponent} from '../view/client/client-details/client-details.component';
import {CaseDetailsComponent} from '../view/case/case-details/case-details.component';
import {TagSearchComponent} from '../view/tagging/tag-search/tag-search.component';
import {TopicListComponent} from '../view/tagging/topic-list/topic-list.component';
import {TopicDetailsComponent} from '../view/tagging/topic-details/topic-details.component';

const routes: Routes = [
  { path: '', component: LoginComponent },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent, canActivate: [RoleGuard], data: { expectedRole: 'admin'} },

  { path: 'clients', component: ClientListComponent },
  { path: 'cases', component: CaseListComponent },

  { path: 'clients/:id', component: ClientDetailsComponent },
  { path: 'cases/:id', component: CaseDetailsComponent },

  { path: 'tags', component: TagSearchComponent },
  { path: 'tags/topics', component: TopicListComponent },
  { path: 'tags/topics/:id', component: TopicDetailsComponent }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]

})
export class AppRoutingModule { }
