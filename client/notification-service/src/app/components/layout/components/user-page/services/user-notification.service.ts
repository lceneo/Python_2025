import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, tap} from 'rxjs';
import {UserNotification} from '../../../../../types/UserNotification';

@Injectable({
  providedIn: 'root'
})
export class UserNotificationService {

  private httpClient = inject(HttpClient);

  constructor() {
    this.get$().subscribe();
  }

  private apiPath = '/api/notifications';

  userNotifications = signal<UserNotification[]>([]);

  get$() {
    return this.httpClient.get<UserNotification[]>(`${this.apiPath}/get`)
      .pipe(
        map(notifications => notifications.sort((f, s) => {
          return new Date(f.notification_time).getTime() - new Date(s.notification_time).getTime();
        })),
        tap(notifications => this.userNotifications.set(notifications))
      );
  }

  createNotification$(newNotification: { notification_text: string, notification_time: string }) {
    return this.httpClient.post<UserNotification>(`${this.apiPath}/create`, newNotification)
      .pipe(
        tap(newNotification => {
          this.userNotifications.update(notifications => ([
            ...notifications,
              newNotification
            ].sort((f, s) => {
              return new Date(f.notification_time).getTime() - new Date(s.notification_time).getTime();
            })
          ))
        })
      )
  }

  updateNotification$(notificationId: number, changedNotification: { notification_text?: string, notification_time?: string }) {
    return this.httpClient.put(`${this.apiPath}/change?notification_id=${notificationId}`, changedNotification)
      .pipe(
        tap(_ => this.userNotifications.update(notifications => {
          const editedNotificationIndex = notifications.findIndex(n => n.notification_id === notificationId);
          return notifications.map((n, i) => i === editedNotificationIndex ? {...n, ...changedNotification} : n)
            .sort((f, s) => {
              return new Date(f.notification_time).getTime() - new Date(s.notification_time).getTime();
            });
        }))
      );
  }

  deleteNotification$(notificationId: number) {
    return this.httpClient.delete(`${this.apiPath}/delete?notification_id=${notificationId}`)
      .pipe(
        tap(_ => this.userNotifications.update(notifications => {
          return notifications.filter(n => n.notification_id !== notificationId);
        }))
      );
  }
}
