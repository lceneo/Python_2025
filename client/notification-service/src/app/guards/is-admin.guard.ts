import {CanMatchFn} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../services/auth/auth.service';
import {UserRolesEnum} from '../services/auth/types/UserRolesEnum';

export const isAdminGuard: CanMatchFn = () => {
  const authS = inject(AuthService);
  return authS.isAuthenticated() && authS.userInfo()?.roleId === UserRolesEnum.Admin
}
