import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {Cookie} from 'ng2-cookies/ng2-cookies';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private _router: Router){
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    // this will be passed from the route config
    // on the data property
    const expectedRole = next.data.expectedRole;
    console.log('checking role access: ' + expectedRole);

    const grants = Cookie.get('grants');
    if (grants.includes(expectedRole)){
      return true;
    }
    this._router.navigate(['/login']);
    return false;

  }
}
