import { StorageService } from './../storage.service';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuardService implements CanActivate {
  constructor(private storage: StorageService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const hasToken = !!this.storage.getLocal<string>('token');
    if (!hasToken) {
      this.router.navigate(['/']);
    }
    return !!this.storage.getLocal<string>('token');
  }
}
