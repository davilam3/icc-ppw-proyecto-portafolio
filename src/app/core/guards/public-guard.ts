import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/firebase/auth';
import { inject } from '@angular/core';




export const publicGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Si ya está autenticado, redirigir a home
  if (authService.isAuthenticated()) {
    router.navigate(['/inicio']);
    return false;
  }

  return true;
};
