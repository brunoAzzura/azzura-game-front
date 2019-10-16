import { environment } from './../environments/environment';
import { User } from './../interface/user';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../authentication/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  BASE_URL = environment.apiGameUrl;

  constructor(
    private _http: HttpClient,
    private _auth: AuthService
  ) { }

  getUser(id): Observable<Object> {
    return this._http.get(this.BASE_URL + 'users/' + id);
  }

  getUsers() {
    return this._http.get(this.BASE_URL + 'users');
  }

  unlockUserReward(userId, themeId): Observable<Object> {
    return this._http.get(this.BASE_URL + 'users/' + userId + '/rand_good_to_knows/' + themeId );
  }

  unlockUserInvestmentBonus(userId): Observable<Object> {
    return this._http.get(this.BASE_URL + 'unlock_investement/' + userId);
  }

  userCompleteWorld (userId: number, worldId: number): Observable<Object> {
    return this._http.post(`${this.BASE_URL}users/${userId}/complete/worlds/${worldId}`, {});
  }

  editUserAvatar (userId, avatarId): Observable<Object> {
    const data = { userId: userId, avatarId: avatarId};
    return this._http.post(this.BASE_URL + 'user_edit_avatar', data);
  }

  getAvatar(user) {
    for (const userAvatar of user.avatar) {
      if (userAvatar.actif) {
        return userAvatar.avatar;
      }
    }
    return null;
  }

  getUserGoodtoknows(userId): Observable<Object> {
    return this._http.get(this.BASE_URL + 'users/' + userId + '/good_to_knows');
  }

  getUserWorldsScores(userId): Observable<Object> {
    return this._http.get(this.BASE_URL + 'users/' + userId + '/worlds_scores');
  }

  getUserBonusInvestisments(userId): Observable<Object> {
    return this._http.get(this.BASE_URL + 'users/' + userId + '/bonus_investisments');
  }

  getUserGoodtoknowStats(userId): Observable<Object> {
    return this._http.get(this.BASE_URL + 'user_goodtoknow_stats/' + userId);
  }

  register(user) {
    return this._http.post(`${this.BASE_URL}users`, user);
  }

  patchUser(user, userId) {
    return this._http.patch(`${this.BASE_URL}users/${userId}`, user);
  }

  downloadCertificate() {
    return this._http.get(this.BASE_URL + 'downloadcertificate/1/', {responseType: 'blob'});
  }

  getCertificate(userId) {
    return this._http.get(this.BASE_URL + 'users_certificat/' + userId);
  }

  resetGame(userId) {
    return this._http.get(this.BASE_URL + 'user_reset_game/' + userId);
  }
}
