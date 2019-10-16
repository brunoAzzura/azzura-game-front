import { environment } from './../environments/environment';
import { LocalStorageService } from 'ngx-store';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../authentication/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AvatarService {

  BASE_URL = environment.apiGameUrl;

  constructor(
    private _http: HttpClient,
    private _auth: AuthService
  ) { }

  getAvatars(): Observable<Object> {
    return this._http.get(this.BASE_URL + 'avatars');
  }

  updateAvatar(avatar): Observable<Object> {
    return this._http.put(this.BASE_URL + 'avatars', avatar);
  }
}
