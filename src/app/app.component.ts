import { AfterViewInit, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { CopyrightDirective } from './copyright.directive';
import { APP_SETTINGS } from './app.settings';
import { AuthComponent } from './auth/auth.component';
import { MatToolbarRow, MatToolbar } from '@angular/material/toolbar';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    ProductListComponent,
    RouterLinkActive,
    CopyrightDirective,
    AuthComponent,
    MatToolbarRow,
    MatToolbar,
    MatButton
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit {
  settings = inject(APP_SETTINGS);
  title = '';

  ngAfterViewInit(): void {
    this.title = this.settings.title;
  }
}
