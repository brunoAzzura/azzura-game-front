import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { LocalStorageService } from 'ngx-store';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

// @todo : finaliser le service pour utiliser au mieu les tokens ...
// @todo : https://auth0.com/blog/angular-2-authentication/
export class AuthService {
  ROLE_ADMIN = 'ROLE_ADMIN';
  BASE_URL = environment.apiGameUrl;

  // @todo tester local storage + static class pour
  // sotcker les informations de l'utilisateur

  constructor(
    private _http: HttpClient,
    private _localStorageService: LocalStorageService,
  ) { }

  login(email: string, password: string) {
    const body = { username: email, password: password };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    return this._http.post(this.BASE_URL + 'tokens', body, httpOptions)
      .pipe(map((res: any) => {
        this._localStorageService.set('user', res.user);
        this._localStorageService.set('token', res.token);
        return res.user;
      }));
  }

  logout() {
    this._localStorageService.remove('user');
    this._localStorageService.remove('token');
  }

  getToken() {
    return this._localStorageService.get('token');
  }

  getUser() {
    return this._localStorageService.get('user');
  }

  isAdmin() {
    if (this.getUser()) {
      const roles = this.getUser().roles;
      return !((roles.find(x => x === this.ROLE_ADMIN) === undefined));
    } else {
      return false;
    }
  }

  updateRanking(ranking) {
    const user = this._localStorageService.get('user');
    user.ranking = ranking;
    this._localStorageService.set('user', user);
  }

  getHttpHeaderToken(method: string) {
    if (method === 'get' || method === 'delete') {
      return {
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + this._localStorageService.get('token')
        })
      };
    } else {
      return {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this._localStorageService.get('token')
          // 'Accept': 'application/json'
        })
      };
    }
  }

}
