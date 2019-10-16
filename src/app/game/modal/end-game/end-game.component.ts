import { GameService } from './../../../service/game.service';
import { Component, OnInit, Input } from '@angular/core';
import {SCORE_NEXT_WORLD_UNLOCK, SCORE_MAX_BY_WORLD} from './../../../constants';

@Component({
  selector: 'app-end-game',
  templateUrl: './end-game.component.html',
  styleUrls: ['./end-game.component.sass']
})
export class EndGameComponent implements OnInit {

  @Input() score: number;
  @Input() completed: boolean;

  constructor(
    private _gameService: GameService
  ) { }

  ngOnInit() {
  }

    /**
   * Retourne la bonne vidée lorsque le jeu est fini
   */
    getVideoGameOver() {
      if (this.completed && this.score === SCORE_MAX_BY_WORLD) {
        return 'assets/video/theme/world_completed_100.mp4';
      } else if (this.completed) {
        return 'assets/video/theme/world_completed.mp4';
      } else {
        return 'assets/video/theme/world_fail.mp4';
      }
    }

    close() {
      this._gameService.disptachModalClosed('worldMap');
    }
}
