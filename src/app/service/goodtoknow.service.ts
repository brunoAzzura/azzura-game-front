import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-store';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../authentication/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GoodtoknowService {

  BASE_URL = environment.apiGameUrl;

  constructor(
    private _http: HttpClient,
    private _auth: AuthService
  ) { }

  getGoodtoknows(): Observable<Object> {
    return this._http.get(this.BASE_URL + 'goodtoknows');
  }

  updateGoodtoknow(goodtoknow): Observable<Object> {
    return this._http.put(this.BASE_URL + 'goodtoknows', goodtoknow);
  }
}
