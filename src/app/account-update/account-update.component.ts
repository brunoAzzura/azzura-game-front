import { environment } from './../environments/environment';
import { WorldService } from './../service/world.service';
import { UserService } from './../service/user.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../authentication/services/auth.service';
import { AvatarService } from '../service/avatar.service';

@Component({
  selector: 'app-account-update',
  templateUrl: './account-update.component.html',
  styleUrls: ['./account-update.component.sass']
})
export class AccountUpdateComponent implements OnInit {

  public user = null;
  public avatar_path = null;
  public selectedAvatar;
  public worlds;
  public avatars$;
  public worldScores;

  BASE_URL = environment.apiGameUrl;

  constructor(
    private _userService: UserService,
    private _authService: AuthService,
    private _avatarService: AvatarService
  ) { }


  ngOnInit() {
    const user = this._authService.getUser();
    this._userService.getUser(user.id).subscribe(
      (res) => {
        this.user = res;
        this.selectedAvatar = this._userService.getAvatar(this.user);
        this.avatar_path = this.selectedAvatar ? this.selectedAvatar.image_path : null;
      }
    );

    this.avatars$ = this._avatarService.getAvatars();
  }

  changeSelectedAvatar(avatar) {
    this.selectedAvatar = avatar;
  }

  editUserAvatar() {
    this._userService.editUserAvatar(this.user.id, this.selectedAvatar.id).subscribe(
      (res) => {
        this.avatar_path = this.selectedAvatar.image_path;
      }
    );
  }

  userchange(user) {
    this.user = user;
  }

  resetGame() {
    this._userService.resetGame(this.user.id).subscribe(
      (res) => {
        this._authService.updateRanking(0);
        alert('Votre compte a bien été réinitialisé !');
      }
    );
  }

}
