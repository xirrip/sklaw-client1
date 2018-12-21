import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CustomMaterialModule } from './core/material.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import { AppRoutingModule } from './core/app-routing.module';
import { UserComponent } from './user/user.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {UserService} from './service/user.service';
import {JwtInterceptor} from './interceptor/jwt-interceptor';
import { RegisterComponent } from './register/register.component';
import { NewcaseDialogComponent } from './newcase-dialog/newcase-dialog.component';

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
 * this contains a simple transformRequest function to add authorization header:
 * https://jeremymarc.github.io/2014/08/14/oauth2-with-angular-the-right-way
 * additional info to encrypt refresh token and automatically renew token
 *
 * newer info: implicit flow should not be used anymore :-)
 * public clients could use PKCE extension: https://oauth.net/2/pkce/
 * long info: https://tools.ietf.org/html/draft-ietf-oauth-security-topics-10
 * and more: https://tools.ietf.org/html/draft-parecki-oauth-browser-based-apps-02
 *
 * and maybe run angular over https:
 * https://medium.com/@richardr39/using-angular-cli-to-serve-over-https-locally-70dab07417c8
 * angular 6+ config: https://stackoverflow.com/questions/39210467/get-angular-cli-to-ng-serve-over-https
 *
 * complete UI tutorial:
 * https://www.sitepoint.com/angular-material-design-components/
 */

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    RegisterComponent,
    NewcaseDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  entryComponents: [
    NewcaseDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
