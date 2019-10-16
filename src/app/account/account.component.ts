import { environment } from './../environments/environment';
import { UserService } from './../service/user.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../authentication/services/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.sass']
})
export class AccountComponent implements OnInit {

  public user = null;
  public avatar_path = null;
  public goodToKnowStats = null;
  public worldScores;

  BASE_URL = environment.apiGameUrl;

  constructor(
    private _userService: UserService,
    private _authService: AuthService
  ) { }


  ngOnInit() {
    const user = this._authService.getUser();
    this._userService.getUser(user.id).subscribe(
      (res) => {
        this.user = res;
        for (const userAvatar of this.user.avatar) {
          if (userAvatar.actif) {
            this.avatar_path = userAvatar.avatar.image_path;
          }
        }
      }
    );

    this._userService.getUserWorldsScores(user.id).subscribe(
      (res) => {
        this.worldScores = res;
      }
    );

    this._userService.getUserGoodtoknowStats(user.id).subscribe(
      (res) => {
        this.goodToKnowStats = res;
      }
    );
  }

  getGoodToKnowStat(worldId) {
    return this.goodToKnowStats.find(goodToKnowStat => goodToKnowStat.id === worldId);
  }
}
