import {ChangeDetectionStrategy, Component, effect, inject} from '@angular/core';
import {AdminService} from '../../services/admin.service';
import {DatePipe} from '@angular/common';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {User} from '../../../user-page/types/User';
import {MatDialog} from '@angular/material/dialog';
import {BanUserComponent} from './dialogs/ban-user/ban-user.component';
import {filter, switchMap} from 'rxjs';

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
  private matDialog = inject(MatDialog);

  banUser(user: User) {
    this.matDialog.open(BanUserComponent, {
      autoFocus: false
    }).afterClosed()
      .pipe(
        filter(banReason => !!banReason),
        switchMap(banReason => this.adminS.changeUserBanState$({ user_id: user.user_id, is_banned: true, ban_reason: banReason }))
      ).subscribe();
  }

  unbanUser(user: User) {
    this.adminS.changeUserBanState$({ user_id: user.user_id, is_banned: false })
      .subscribe();
  }
}
