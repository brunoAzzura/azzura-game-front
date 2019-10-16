import { LocalStorageService } from 'ngx-store';
import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../authentication/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  BASE_URL = environment.apiGameUrl;

  constructor(
    private _http: HttpClient,
    private _auth: AuthService
  ) { }

  getThemes() {
    return this._http.get(this.BASE_URL + 'themes/');
  }

  getTheme(id): Observable<Object> {
    return this._http.get(this.BASE_URL + 'themes/' + id);
  }

  updateTheme(theme, id) {
    return this._http.patch(this.BASE_URL + 'themes/' + id, theme);
  }

  updateThemeDraw(themeDraw, id) {
    return this._http.patch(this.BASE_URL + 'themedraw/' + id, themeDraw );
  }

  updateThemeGameType(gameType, id) {
    return this._http.post(this.BASE_URL + 'themes/' + id + '/game_type', gameType );
  }

  insertTheme(theme) {
    return this._http.post(this.BASE_URL + 'themes', theme);
  }

  getMemoryCards(id) {
    return this._http.get(this.BASE_URL + 'themes/' + id + '/memorycards' );
  }

  getPuzzleGame(id) {
    return this._http.get(this.BASE_URL + 'themes/' + id + '/puzzle' );
  }

  getGameTypes() {
    return this._http.get(this.BASE_URL + 'gametypes/');
  }

  addThemeQuestion(themeId, question) {
    return this._http.post(this.BASE_URL + 'themes/' + themeId + '/questions', question);
  }

  getThemeQuestions(id: number): Observable<Object> {
    return this._http.get(this.BASE_URL + 'themes/' + id + '/questions');
  }
}
