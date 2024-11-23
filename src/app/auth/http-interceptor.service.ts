import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';

export const meuhttpInterceptor: HttpInterceptorFn = (request, next) => {
  const router = inject(Router);

  // token existe no localStorage?
  const token = localStorage.getItem('token');
  if (token) {
    //cabeçalho de autorização com o token
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
