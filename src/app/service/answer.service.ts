import { environment } from './../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../authentication/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  public BASE_URL = environment.apiGameUrl;

  constructor(
    private _http: HttpClient,
    private _auth: AuthService
  ) { }

  insertAnswer(answer) {
    return this._http.post(this.BASE_URL + 'answers', answer);
  }

  deleteAnswer(id) {
    return this._http.delete(this.BASE_URL + 'answers/' + id);
  }
}
