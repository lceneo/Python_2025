import {inject} from '@angular/core';
import {AuthService} from '../services/auth/auth.service';
import {CanActivateFn, Router} from '@angular/router';

export const unauthGuard: CanActivateFn = () => {
  const router = inject(Router);
  const isAuthenticated = inject(AuthService).isAuthenticated();
  if (isAuthenticated) {
    router.navigate(['main']);
    return false;
  }
  return true;
}
