import { AuthenticationService } from '../../shared/services/authentication.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ){

  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = localStorage.getItem('token');

    if (token){
      const authReq = req.clone({
        setHeaders: {
          Authorization: token
        }
      });

      return next.handle(authReq)
      .pipe(
        catchError((error) => {
          if (error instanceof HttpErrorResponse){
            if (error.status === 401){
              this.authService.logout();
              this.router.navigateByUrl('/auth/login');
            }
          }
          return throwError(error);
        })
      )
    }
    return next.handle(req);
  }
}
