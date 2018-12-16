import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CustomMaterialModule } from './core/material.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import { AppRoutingModule } from './core/app-routing.module';
import { UserComponent } from './user/user.component';
import { HttpClientModule } from '@angular/common/http';
import {UserService} from './service/user.service';

/**
 * https://angular.io/tutorial
 * https://www.devglan.com/angular/angular-material-app
 *
 * another long getting started:
 * https://go.tiny.cloud/blog/angular-5-tutorial-step-step-guide-first-angular-5-app/
 *
 * JWT:
 * https://stackoverflow.com/questions/51654604/jwt-with-angular-and-springboot
 *
 */

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ UserService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
