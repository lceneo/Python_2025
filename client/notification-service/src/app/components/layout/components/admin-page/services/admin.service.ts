import {inject, Injectable, signal} from '@angular/core';
import {UserNotification} from '../../../../../types/UserNotification';
import {map, switchMap, tap} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {User} from '../../user-page/types/User';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private httpClient = inject(HttpClient);


  allUsers = signal<User[]>([]);
  notifications = signal<Array<UserNotification & {user_name: string}>>([])
  private apiPath = '/api/admin';

  constructor() {
    this.getAllUsers$()
      .pipe(
        switchMap(() => this.getAllNotifications$())
      ).subscribe();
  }


  getAllNotifications$() {
    return this.httpClient.get<UserNotification[]>(`${this.apiPath}/get_all_notifications`)
      .pipe(
        map(notifications => notifications.map(notification => ({
          ...notification,
          user_name: this.allUsers().find(u => u.user_id === notification.user_id)!.user_name
        }))
        ),
        map(notifications => notifications.sort((f, s) => {
          return new Date(f.notification_time).getTime() - new Date(s.notification_time).getTime();
        })),
        tap(notifications => this.notifications.set(notifications))
      );
  }

  getAllUsers$() {
    return this.httpClient.get<User[]>(`${this.apiPath}/get_all_users`)
      .pipe(
        tap(users => this.allUsers.set(users))
      );
  }

  changeUserBanState$(userBanState: { user_id: number, is_banned: boolean } ) {
    return this.httpClient.post(`${this.apiPath}/user_ban_state`, userBanState)
      .pipe(
        tap(() => this.allUsers.update(users => {
          const editedUserIndex = users.findIndex(u => u.user_id === userBanState.user_id);
          return users.map((u, i) => i === editedUserIndex ? {...u, user_banned: userBanState.is_banned} : u);
        }))
      )
  }

}
