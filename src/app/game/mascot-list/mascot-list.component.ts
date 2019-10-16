import { ModalService } from './../../service/modal.service';
import { DeviceService } from './../../service/device.service';
import { GameService } from './../../service/game.service';
import { GameContainerModalComponent } from '../modal/game-container-modal/game-container-modal.component';
import { environment } from '../../environments/environment';
import { Theme } from './../../interface/theme';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ThemeDraw } from 'src/app/interface/theme-draw';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-mascot-list',
  templateUrl: './mascot-list.component.html',
  styleUrls: ['./mascot-list.component.sass'],
  animations: [
    trigger('biggerAnimation', [
      state('big', style({
        transform: 'scale(1.1)'
      })), // permet de rester grand temps que l'on reste sur l'image
      transition('small => big', animate(400, style({transform: 'scale(1.1)'}))),
      transition('big => small', animate(400, style({transform: 'scale(1)'})))
    ])
  ]

})
export class MascotListComponent implements OnInit {

  @Input() themes: Theme[];
  @Input() scores: Array<any>;
  public currentTheme: Theme;
  public fullSreen: boolean;

  @Output()
  gameCompleted: EventEmitter<any> = new EventEmitter();

  public sizes: string[];
  public BASE_PATH = environment.apiGameUrl;

  constructor(
    private _gameService: GameService,
    private _deviceService: DeviceService,
    private _modalService: ModalService
  ) { }

  ngOnInit() {
    this.fullSreen = this._deviceService.isFullScreen();
    this.sizes = [];
    for (const theme of this.themes) {
      this.sizes[theme.id] = 'small';
    }

    this._gameService.handleGameCompleted().subscribe(
      data => {
        this._modalService.closeModal();
        this.gameCompleted.emit({theme: this.currentTheme, result: data });
      }
    );
  }

    /**
   * Check si un theme a déja etait effectué
   * @param theme Theme
   */
  themeDone(theme: Theme) {
    let score: any;
    score = this.scores.find(value => value.id === theme.id);
    if ( score === undefined) {
      return false;
    } else {
      return true;
    }
  }

  /**
   *  Retourne le positionnement des différents elements
  **/
 getStylePosition(themeDraw: ThemeDraw): {} {
  return {'left': themeDraw.position_x + '%', 'top': themeDraw.position_y + '%', 'width': themeDraw.width + '%'};
}

getImgPath(theme: Theme) {
  let score: any;
  score = this.scores.find(value => value.id === theme.id);
  if ( score === undefined) {
    return this.BASE_PATH + theme.theme_draw.image_path;
  } else if (score.answer === true ) {
    return this.BASE_PATH + theme.theme_draw.image_success_path;
  } else if (score.answer === false ) {
    return this.BASE_PATH + theme.theme_draw.image_error_path;
  }
}

  /**
   *  Deplacer la sourie sur un élément le rend plus grand
  **/
 select($event: MouseEvent, id: number) {
  this.sizes[id] = 'big';
}

/**
/* Retirer la sourie d'un élément le fait retrouver sa taille normale
**/
out($event: MouseEvent, id: number) {
  this.sizes[id] = 'small';
}

displayGame(theme) {
  const initialState = {theme: theme};

  let classNames = 'modal-sm';
  this.currentTheme = theme;
  if (this.fullSreen ) { // && !(this.currentTheme.game_type.wording === 'puzzle')
    classNames = 'modal-lg';
  }
  this._modalService.openModal(GameContainerModalComponent, initialState, classNames);
}
}
