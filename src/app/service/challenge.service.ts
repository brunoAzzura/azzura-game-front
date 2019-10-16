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
export class ChallengeService  {

  BASE_URL = environment.apiGameUrl;

  constructor(
    private _http: HttpClient,
    private _localStorageService: LocalStorageService,
    private _auth: AuthService
  ) { }

  getChallenges(): Observable<Object> {
    return this._http.get(this.BASE_URL + 'challenges');
  }

  getChallenge(id): Observable<Object> {
    return this._http.get(this.BASE_URL + 'challenges/' + id);
  }

  updateChallenge(id, modifiedChallenge) {
    return this._http.patch(this.BASE_URL + 'challenges/' + id, modifiedChallenge);
  }

  getChallengeQuestions(id: number): Observable<Object> {
    return this._http.get(this.BASE_URL + 'challenges/' + id + '/questions');
  }

  addChallengeQuestion(challengeId, question) {
    return this._http.post(this.BASE_URL + 'challenges/' + challengeId + '/questions', question);
  }
}
