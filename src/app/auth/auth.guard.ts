import { User } from './../interface/user';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../authentication/services/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private _auth: AuthService,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // return true;
    // @todo : à finaliser
    // @todo : ajouter des conditions en fonction de l'admin !
    if (!this._auth.getUser()) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
