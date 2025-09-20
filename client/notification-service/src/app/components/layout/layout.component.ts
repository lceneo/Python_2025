import { ChangeDetectionStrategy, Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-main',
  imports: [
    RouterOutlet
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class LayoutComponent {

}
