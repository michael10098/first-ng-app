import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, ErrorHandler, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { APP_SETTINGS, appSettings } from './app.settings';
import { authInterceptor } from './auth.interceptor';
import { AppErrorHandler } from './app-error-handler';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([authInterceptor])),
    { provide: APP_SETTINGS, useValue: appSettings },
    { provide: ErrorHandler, useClass: AppErrorHandler }, provideAnimationsAsync()
  ]
};
