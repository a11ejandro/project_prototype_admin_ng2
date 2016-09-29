import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { APP_BASE_HREF } from '@angular/common';

import { Http, XHRBackend} from '@angular/http';

import { BackendInterceptor } from "./helpers/backend-interceptor";

import './rxjs-extensions';

import { routing, routedComponents } from './app.routing';
import { AuthGuard } from './sessions/auth-guard.service'
import { SearchParamsProxy } from "./helpers/search-params-proxy";

/*COMPONENTS*/
import { AppComponent } from './app.component';
import { UserDetailComponent } from "./users/user-detail.component";
import { SignInComponent } from "./sessions/sign-in.component"
import { AuthorisedComponent } from "./authorised.component";
import { UsersComponent } from "./users/users.component";

/*SERVICES*/
import { ConfigService } from "./config.service";
import { UserService } from './users/user.service';
import { SessionService } from './sessions/session.service';

/*DIRECTIVES*/
import { HostSrcDirective } from "./directives/host-src.directive";
import { ValidateEqualDirective } from "./directives/validate-equal.directive";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    HttpModule
  ],

  declarations: [
    AppComponent,
    routedComponents,
    SignInComponent,
    UserDetailComponent,
    UsersComponent,
    AuthorisedComponent,

    HostSrcDirective,
    ValidateEqualDirective
  ],

  providers: [
    UserService,
    SessionService,
    ConfigService,
    SearchParamsProxy,
    AuthGuard,
    [
      { provide: XHRBackend, useClass: BackendInterceptor },
    ],
  ],

  bootstrap: [AppComponent]
})

export class AppModule { }
