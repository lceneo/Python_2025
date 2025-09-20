import {ChangeDetectionStrategy, Component, effect, inject} from '@angular/core';
import {AdminService} from '../../services/admin.service';
import {DatePipe} from '@angular/common';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {User} from '../../../user-page/types/User';

@Component({
  selector: 'app-user-list',
  imports: [
    DatePipe,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatIcon,
    MatIconButton
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent {
  protected adminS = inject(AdminService);
  protected users = this.adminS.allUsers;

  banUser(user: User) {
    this.adminS.changeUserBanState$({ user_id: user.user_id, is_banned: true })
      .subscribe();
  }

  unbanUser(user: User) {
    this.adminS.changeUserBanState$({ user_id: user.user_id, is_banned: false })
      .subscribe();
  }
}
