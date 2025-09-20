import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatFormField, MatInput, MatLabel, MatSuffix} from "@angular/material/input";
import {MatTimepicker, MatTimepickerInput, MatTimepickerToggle} from "@angular/material/timepicker";
import {UserNotificationService} from '../../services/user-notification.service';

@Component({
  selector: 'app-create-user-notification',
  imports: [
    FormsModule,
    MatButton,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatFormField,
    MatInput,
    MatLabel,
    MatSuffix,
    MatTimepicker,
    MatTimepickerInput,
    MatTimepickerToggle,
    ReactiveFormsModule
  ],
  templateUrl: './create-user-notification.component.html',
  styleUrl: './create-user-notification.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateUserNotificationComponent {

  private userNotificationS = inject(UserNotificationService);

  notificationForm = new FormGroup({
    notificationText: new FormControl('', [Validators.required]),
    notificationTime: new FormControl(new Date().toISOString(), [Validators.required]),
  })

  protected createNotification() {
    this.userNotificationS.createNotification$({
      notification_text: this.notificationForm.controls.notificationText.value!,
      notification_time: this.notificationForm.controls.notificationTime.value!,
    }).subscribe();
  }
}
