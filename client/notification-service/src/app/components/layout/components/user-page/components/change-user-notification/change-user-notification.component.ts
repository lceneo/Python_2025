import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {UserNotification} from '../../../../../../types/UserNotification';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from '@angular/material/dialog';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormField, MatInput, MatInputModule, MatLabel} from '@angular/material/input';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from '@angular/material/datepicker';
import {
  MatTimepicker,
  MatTimepickerInput,
  MatTimepickerModule,
  MatTimepickerToggle
} from '@angular/material/timepicker';
import {MatButton} from '@angular/material/button';
import {UserNotificationService} from '../../services/user-notification.service';

@Component({
  selector: 'app-change-user-notification',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatFormField,
    MatLabel,
    ReactiveFormsModule,
    MatInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatDatepickerInput,
    MatTimepickerInput,
    FormsModule,
    MatTimepicker,
    MatTimepickerToggle,
    MatInputModule,
    MatTimepickerModule,
    MatDatepickerModule,
    FormsModule,
    MatDialogActions,
    MatDialogClose,
    MatButton,
  ],
  templateUrl: './change-user-notification.component.html',
  styleUrl: './change-user-notification.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangeUserNotificationComponent {

  userNotification = inject<UserNotification>(MAT_DIALOG_DATA);
  private userNotificationS = inject(UserNotificationService);

  notificationForm = new FormGroup({
    notificationText: new FormControl(this.userNotification.notification_text, [Validators.required]),
    notificationTime: new FormControl(this.userNotification.notification_time, [Validators.required]),
  })

  protected changeNotification() {
    this.userNotificationS.updateNotification$(this.userNotification.notification_id, {
      notification_text: this.notificationForm.controls.notificationText.value!,
      notification_time: this.notificationForm.controls.notificationTime.value!,
    }).subscribe();
  }
}
