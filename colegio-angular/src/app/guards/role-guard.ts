import { CanActivateFn, Router } from '@angular/router';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '../services/auth.service';

export const roleGuard = (rolesPermitidos: string[]): CanActivateFn => {

  return () => {

    const authService = inject(AuthService);
    const router = inject(Router);
    const platformId = inject(PLATFORM_ID);

    if (!isPlatformBrowser(platformId)) {
      return true;
    }

    const rol = authService.obtenerRol();

    if (rol && rolesPermitidos.includes(rol)) {
      return true;
    }

    return router.createUrlTree(['/alumnos']);
  };
};
