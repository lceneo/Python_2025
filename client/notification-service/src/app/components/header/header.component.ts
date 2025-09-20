import {ChangeDetectionStrategy, Component, inject, input} from '@angular/core';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [
    MatIconButton,
    MatIcon
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {

  private authS = inject(AuthService);
  private router = inject(Router);

  username = input.required<string>();

  logout() {
    this.authS.logout$()
      .subscribe(() => this.router.navigate(['/login']));
  }
}
