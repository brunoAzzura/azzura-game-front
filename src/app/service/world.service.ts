import { environment } from './../environments/environment';
import { LocalStorageService } from 'ngx-store';
import { World } from './../interface/world';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../authentication/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class WorldService {

  BASE_URL = environment.apiGameUrl;

  constructor(
    private _http: HttpClient,
    private _localStorageService: LocalStorageService,
    private _auth: AuthService
  ) { }

  getWorlds(): Observable<Object> {
    return this._http.get(this.BASE_URL + 'worlds');
  }

  getWorldThemes(id: number): Observable<Object> {
    return this._http.get(this.BASE_URL + 'worlds/' + id + '/themes');
  }

  getWorld(id): Observable<Object> {
    return this._http.get(this.BASE_URL + 'worlds/' + id);
  }

  updateWorld(world) {
    return this._http.put(this.BASE_URL + 'worlds', world);
  }

  insertWorld(world) {
    return this._http.post(this.BASE_URL + 'worlds', world);
  }
}
