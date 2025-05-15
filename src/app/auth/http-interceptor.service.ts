import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';

export const meuhttpInterceptor: HttpInterceptorFn = (request, next) => {
  const router = inject(Router);


  // const token = localStorage.getItem('token');
  // if (token) {

  //   request = request.clone({
  //     setHeaders: { Authorization: `Bearer ${token}` },
  //   });
  // }

/* TESTE */
const token = localStorage.getItem('token');
if (token) {
  const decoded = jwtDecode(token);
  const currentTime = Math.floor(Date.now() / 1000);
  if (decoded.exp && decoded.exp < currentTime) {
    Swal.fire({
      icon: 'error',
      title: 'Token Expirado',
      text: 'Seu token expirou. Faça login novamente.',
    }).then(() => {
      localStorage.removeItem('token');
      router.navigate(['/login']);
    });
    return throwError(() => new Error('Token expirado'));
  }
  request = request.clone({
    setHeaders: { Authorization: `Bearer ${token}` },
  });
}


  return next(request).pipe(
    catchError((err: any) => {
      if (err instanceof HttpErrorResponse) {
        switch (err.status) {
          case 401:
            Swal.fire({
              icon: 'error',
              title: 'Erro 401',
              text: 'Não autenticado. Faça login novamente.',
            }).then(() => {
              router.navigate(['/login']);
            });
            break;
          case 403:
            Swal.fire({
              icon: 'error',
              title: 'Erro 403',
              text: 'Você não tem permissão para acessar este recurso.',
            });
            break;
          default:
            Swal.fire({
              icon: 'error',
              title: `Erro ${err.status}`,
              text: err.message || 'Ocorreu um erro desconhecido.',
            });
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Erro inesperado',
          text: 'Algo deu errado. Por favor, tente novamente.',
        });
      }

      return throwError(() => err);
    })
  );
};
