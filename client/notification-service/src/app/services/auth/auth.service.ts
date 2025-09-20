import {computed, effect, inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserInfo} from './types/UserInfo';
import {jwtDecode} from 'jwt-decode';
import {tap} from 'rxjs';
import {UserRolesEnum} from './types/UserRolesEnum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private httpClient = inject(HttpClient);

  private apiPath = '/api/auth';
  private token = signal(localStorage.getItem('token'));
  isAuthenticated = computed(() => !!this.token());

  tokenSaveEffect = effect(() => {
    const token = this.token();
    if (token) { localStorage.setItem('token', token); }
    else {
      localStorage.removeItem('token')
    }
  })

  userInfo = computed<UserInfo | null>(() => {
    const token = this.token();
    if (!token) { return null; }
    const decodedToken = jwtDecode<{role_id: UserRolesEnum, sub: string, username: string}>(token);
    return {
      roleId: decodedToken.role_id,
      id: +decodedToken.sub,
      username: decodedToken.username
    }
  });

  login$(username: string) {
    return this.httpClient.post<string>(`${this.apiPath}/login`, { username })
      .pipe(
        tap(token => this.token.set(token))
      );
  }

  logout$() {
    return this.httpClient.post(`${this.apiPath}/logout`, null)
      .pipe(
        tap(() => {
          this.token.set(null);
          location.reload();
        })
      )
  }
}
