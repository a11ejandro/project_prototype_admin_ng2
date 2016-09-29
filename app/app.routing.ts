import { Routes, RouterModule, CanActivate } from '@angular/router';

import { SignInComponent } from './sessions/sign-in.component';
import { UsersComponent } from './users/users.component';
import { UserDetailComponent } from './users/user-detail.component';
import { AuthGuard } from './sessions/auth-guard.service'
import { AuthorisedComponent } from "./authorised.component";

const appRoutes: Routes = [
  {
    path: 'sign_in',
    component: SignInComponent
  },

  {
    // Paths with required authorisation
    path: '',
    pathMatch: 'prefix',
    component: AuthorisedComponent,
    canActivate: [AuthGuard],

    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'users'
      },

      {
        path: 'users/:id',
        component: UserDetailComponent
      },

      {
        path: 'users',
        component: UsersComponent
      }
    ],
  },
];

export const routing = RouterModule.forRoot(appRoutes);

export const routedComponents = [SignInComponent, UsersComponent, UserDetailComponent];
