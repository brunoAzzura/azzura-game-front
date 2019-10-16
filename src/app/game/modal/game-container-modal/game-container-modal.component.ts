import { Component, Input, OnInit } from '@angular/core';
import { GameService } from '../../../service/game.service';

@Component({
  selector: 'app-game-container-modal',
  templateUrl: './game-container-modal.component.html',
  styleUrls: ['./game-container-modal.component.sass']
})
export class GameContainerModalComponent implements OnInit {

  @Input() theme;
  public state: string;

  constructor(
    private _gameService: GameService
  ) { }

  ngOnInit() {
    this.state = this.theme.game_type.wording;
  }

  // fonction executer quand le jeu de memoire se finit  (succès ou echec)
  completeGame(result: boolean) {
    this._gameService.disptachGameCompleted(result);
  }

}
