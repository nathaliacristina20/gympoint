import { tap } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuardService implements CanActivate {
  constructor(private router: Router, private authService: AuthenticationService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.isAuthenticated()
    .pipe(
      tap(logged => {
        if (!logged){
          this.router.navigateByUrl('/login');
        }
      })
    )
  }
}
