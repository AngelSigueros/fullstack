import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { inject } from '@angular/core';

/*
Guard funcional. comprobar si user es ADMIN
Protege rutas, se añade sobre la ruta q queremos proteger en app.routes.ts
ADMIN pasa
No ADMIN redirigir a /login
*/
export const userRoleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  if (authService.getIsAdmin())
    return true;
  return router.navigate(['/login']);
};
