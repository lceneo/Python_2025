import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {AdminService} from '../../services/admin.service';
import {AsyncPipe, DatePipe} from '@angular/common';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-notifications-list',
  imports: [
    DatePipe,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatIcon,
    MatIconButton,
    AsyncPipe
  ],
  templateUrl: './notifications-list.component.html',
  styleUrl: './notifications-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationsListComponent {

  private adminS = inject(AdminService);

  notifications = this.adminS.notifications;
}
