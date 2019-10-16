import { ModalService } from './../../service/modal.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { GameService } from 'src/app/service/game.service';
import { getRandomInt } from '../../helper/number';
import { RewardComponent } from '../modal/reward/reward.component';

@Component({
  selector: 'app-coin-bonus',
  templateUrl: './coin-bonus.component.html',
  styleUrls: ['./coin-bonus.component.sass'],
  animations: [
    trigger('moveRandomly', [
      state('move0', style({transform: 'translate({{rand0X}}, {{rand0Y}})'}), {params : {rand0X: '0%', rand0Y : '0%'} }),
      state('move1', style({transform: 'translate({{rand1X}}, {{rand1Y}})'}), {params : {rand1X: '1700%', rand1Y : '1000%'} }),
      transition('move0 => move1', animate('1500ms')),
      transition('move1 => move0', animate('1500ms')),
    ])
  ]
})
export class CoinBonusComponent implements OnInit, OnDestroy {

  @Input() userId;

  public displayCoin = false;
  public subscribeCoin;

  public positionCoin = {
    value: 'move0',
    params: {
      rand0X : getRandomInt(0, 1700) + '%',
      rand0Y : getRandomInt(0, 1000) + '%',
      rand1X : getRandomInt(0, 1700) + '%',
      rand1Y : getRandomInt(0, 1000) + '%',
    }
  };

  constructor(
    private _gameService: GameService,
    private _modalService: ModalService
  ) {}

  updatePositionPiece() {
    this.positionCoin = {
      value : this.positionCoin.value === 'move1' ? 'move0' : 'move1',
      params : {
        rand0X : this.positionCoin.value === 'move1' ? getRandomInt(0, 1000) + '%' : this.positionCoin.params.rand0X,
        rand0Y : this.positionCoin.value === 'move1' ? getRandomInt(0, 1000) + '%' : this.positionCoin.params.rand0Y,
        rand1X : this.positionCoin.value === 'move0' ? getRandomInt(0, 1700) + '%' : this.positionCoin.params.rand1X ,
        rand1Y : this.positionCoin.value === 'move0' ? getRandomInt(0, 1000) + '%' : this.positionCoin.params.rand1Y,
      }
    };
  }

  ngOnInit() {

    this.subscribeCoin = this._gameService.getCoinActive().subscribe(
      res => {
        this.displayCoin = res;
        this.updatePositionPiece();
      }
    );
  }

  ngOnDestroy() {
    this.subscribeCoin.unsubscribe();
  }

  unlockBonus() {
    this.displayCoin = false;
    this.subscribeCoin.unsubscribe();
    const initialState = { type: 'investmentBonus', dispatchAction: false, userId: this.userId };
    this._modalService.openModal(RewardComponent, initialState);
  }
}
