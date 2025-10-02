import { ChangeDetectionStrategy, Component } from '@angular/core';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-ban-user',
  imports: [
    MatDialogContent,
    MatDialogTitle,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule
  ],
  templateUrl: './ban-user.component.html',
  styleUrl: './ban-user.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BanUserComponent {

  banReasonControl = new FormControl(null, { validators: [Validators.required], nonNullable: true });
}
