import { HttpInterceptorFn } from '@angular/common/http';

// Agrega token en la cabecera Http
export const jwtInterceptor: HttpInterceptorFn = (req, next) => {

  const token = localStorage.getItem('jwt-token');
  if (token)
    req = req.clone({
      // agregar token a la cabecera Http
      headers: req.headers.set('Authorization', `Bearer ${token}`)
  });


  return next(req);
};
