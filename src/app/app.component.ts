import { Component, inject, Signal, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { CopyrightDirective } from './copyright.directive';
import { APP_SETTINGS, appSettings } from './app.settings';
import { Observable } from 'rxjs';
import { AuthComponent } from './auth/auth.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ProductListComponent,
    CopyrightDirective,
    AuthComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  settings = inject(APP_SETTINGS);
}
