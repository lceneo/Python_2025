import { Routes } from '@angular/router';
import {authGuard} from './guards/auth.guard';
import {unauthGuard} from './guards/unauth.guard';
import {isAdminGuard} from './guards/is-admin.guard';
import {isUserGuard} from './guards/is-user.guard';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./components/layout/layout.component'), canActivate: [authGuard], children: [
      { path: 'main', canMatch: [isAdminGuard], loadComponent: () => import('./components/layout/components/admin-page/admin-page.component') },
      { path: 'main', canMatch: [isUserGuard], loadComponent: () => import('./components/layout/components/user-page/user-page.component') },
    ]
  },
  { path: 'login', canActivate: [unauthGuard], loadComponent: () => import('./components/login/login.component') },
  { path: '**', redirectTo: 'login' }
];
