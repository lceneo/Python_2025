import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {UserNotificationService} from './services/user-notification.service';
import {MatCard, MatCardContent, MatCardFooter, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatChipSet} from '@angular/material/chips';
import {DatePipe} from '@angular/common';
import {MatFabButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {UserNotification} from '../../../../types/UserNotification';
import {
  ChangeUserNotificationComponent
} from './components/change-user-notification/change-user-notification.component';
import {MatDialog} from '@angular/material/dialog';
import {
  CreateUserNotificationComponent
} from './components/create-user-notification/create-user-notification.component';

@Component({
  selector: 'app-user-page',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardTitle,
    DatePipe,
    MatIcon,
    MatIconButton
  ],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class UserPageComponent {

  private userNotificationS = inject(UserNotificationService);
  private matDialog = inject(MatDialog);

  protected userNotifications = this.userNotificationS.userNotifications;

  deleteNotification(notificationId: number) {
    this.userNotificationS.deleteNotification$(notificationId)
      .subscribe();
  }

  changeNotification(notification: UserNotification) {
    this.matDialog.open(ChangeUserNotificationComponent, { data: notification });
  }

  addNewNotification() {
    this.matDialog.open(CreateUserNotificationComponent);
  }
}
