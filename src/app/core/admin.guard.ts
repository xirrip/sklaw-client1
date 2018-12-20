import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {Cookie} from 'ng2-cookies/ng2-cookies';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private _router: Router){

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    const scope = Cookie.get('scope');
    if (scope && scope.includes('admin')) {
      return true;
    }
    this._router.navigate(['login']);
    return false;
  }
}
