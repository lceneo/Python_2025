import { ChangeDetectionStrategy, Component } from '@angular/core';
import {MatTab, MatTabGroup} from '@angular/material/tabs';
import {NotificationsListComponent} from './components/notifications-list/notifications-list.component';
import {UserListComponent} from './components/user-list/user-list.component';

@Component({
  selector: 'app-admin-page',
  imports: [
    MatTabGroup,
    MatTab,
    NotificationsListComponent,
    UserListComponent
  ],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class AdminPageComponent {

}
