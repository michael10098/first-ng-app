import { inject } from '@angular/core'
import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthService } from './auth.service';

export const authGuard: CanMatchFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.isLoggedIn()) {
    return true;
  }
  return router.parseUrl('/');
};
