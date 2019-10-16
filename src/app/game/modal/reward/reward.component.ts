import { DeviceService } from 'src/app/service/device.service';
import { UserService } from './../../../service/user.service';
import { BsModalRef } from 'ngx-bootstrap';
import { GameService } from './../../../service/game.service';
import { Component, OnInit, Input } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-reward',
  templateUrl: './reward.component.html',
  styleUrls: ['./reward.component.sass']
})
export class RewardComponent implements OnInit {

  // @Input() reward;
  @Input() reward;
  @Input() dispatchAction;
  @Input() type;
  @Input() userId;
  public rewardDisplayed: any = false;
  public load = true;
  public fullScreen: boolean;

  public BASE_PATH = environment.apiGameUrl;

  constructor(
    private _gameService: GameService,
    private _bsModalRef: BsModalRef,
    private _userService: UserService,
    private _deviceService: DeviceService
  ) { }

  ngOnInit() {
    this.fullScreen = this._deviceService.isFullScreen();
    if (this.type === 'investmentBonus' ) {
      this._userService.unlockUserInvestmentBonus(this.userId).subscribe(
        (res: any) => {
          this.rewardDisplayed = res.reward;
          this.load = false;
          // reactiver les btns
        }
      );
    } else {
      this.rewardDisplayed = this.reward;
      this.load = false;
    }
  }

  close() {
    if (this.dispatchAction) {
      this._gameService.disptachModalClosed('theme');
    } else {
      this._bsModalRef.hide();
    }
  }
}
