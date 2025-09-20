import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    MatInput,
    MatFormField,
    ReactiveFormsModule,
    MatButton,
    MatLabel
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class LoginComponent {

  private authS = inject(AuthService);
  private router = inject(Router);

  userNameFormControl = new FormControl('', Validators.required);

  protected login() {
    this.authS.login$(this.userNameFormControl.value!)
      .subscribe(() => this.router.navigate(['main']))
  }
}
