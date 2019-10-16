import { ModalService } from 'src/app/service/modal.service';
import { trigger, style, state, transition, animate } from '@angular/animations';
import { GameRewardsComponent } from './../modal/game-rewards/game-rewards.component';
import { Component, OnInit, Input } from '@angular/core';
import { NB_WORLD } from './../../constants';

@Component({
  selector: 'app-flower-trophy',
  templateUrl: './flower-trophy.component.html',
  styleUrls: ['./flower-trophy.component.sass'],
  animations: [
    trigger('biggerFlowerAnimation', [
      state('big', style({
        transform: 'scale(1.05)'
      })),
      transition('small => big', animate(400, style({ transform: 'scale(1.05)' }))),
      transition('big => small', animate(400, style({ transform: 'scale(1)' })))
    ])
  ]
})
export class FlowerTrophyComponent implements OnInit {

  @Input() nbWorldScoreMax: number;
  public bsModalRef;
  public NB_WORLD = NB_WORLD;
  constructor(
    private _modalService: ModalService,
  ) { }

  ngOnInit() {
  }

  openVideo() {
    // if (this.nbWorldScoreMax !== NB_WORLD) {
      const initialState = { videoPath: 'assets/video/world/game_completed.mp4' };
      this._modalService.openModal(GameRewardsComponent, initialState, null, {backdrop: true});
    // }
  }

  getGoodToKnowPicture() {
    return 'assets/img/world/trophy_flower_' + this.nbWorldScoreMax + (this.nbWorldScoreMax === NB_WORLD ? '.gif' : '.png');
  }
}
