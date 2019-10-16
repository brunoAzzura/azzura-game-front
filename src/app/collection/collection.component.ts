import { DeviceService } from './../service/device.service';
import { GoodToKnowBonusComponent } from './modal/good-to-know-bonus/good-to-know-bonus.component';
import { ModalService } from './../service/modal.service';
import { GoodToKnow } from './../interface/good-to-know';
import { environment } from './../environments/environment';
import { WorldService } from './../service/world.service';
import { UserService } from './../service/user.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../authentication/services/auth.service';


@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {

  public BASE_URL = environment.apiGameUrl;

  public goodtoknows = null;
  public goodtoknow_path = null;
  public worlds = null;
  public bonusInvestments = null;
  public goodToKnowStats = null;
  public fullScreen: boolean;

  constructor(
    private _authService: AuthService,
    private _userService: UserService,
    private _worldService: WorldService,
    private _modalService: ModalService,
    private _deviceService: DeviceService
  ) { }

  ngOnInit() {
    this.fullScreen = this._deviceService.isFullScreen();
    const user = this._authService.getUser();
    this._worldService.getWorlds().subscribe(
      (res) => {
        this.worlds = res;
      }
    );

    this._userService.getUserGoodtoknows(user.id).subscribe(
      (res) => {
        this.goodtoknows = res;
      }
    );

    this._userService.getUserBonusInvestisments(user.id).subscribe(
      (res) => {
        this.bonusInvestments = res;
      }
    );

    this._userService.getUserGoodtoknowStats(user.id).subscribe(
      (res) => {
        this.goodToKnowStats = res;
      }
    );
  }

  getGoodtoknowStats(worldId) {
    const stats = this.goodToKnowStats.find( goodToKnowStat => goodToKnowStat.id === worldId);
    if (stats != null) {
      return stats.nbGoodToNowUnlock + '/' + stats.nbGoodToKnow;
    } else {
      return '0/0';
    }
  }

  displayBonus(reward: any, type) {
    const initialState = { reward: reward, type: type };
    this._modalService.openModal(GoodToKnowBonusComponent, initialState, null, {backdrop: true});
  }
}
