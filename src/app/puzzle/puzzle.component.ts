import { DeviceService } from './../service/device.service';
import { PuzzlePiece } from './../interface/puzzle-piece';
import { PuzzleGame } from './../interface/puzzle-game';
import { environment } from './../environments/environment';
import { ThemeService } from './../service/theme.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { shuffle } from '../helper/array';
import { interval, Observable, Subscription } from 'rxjs';
@Component({
  selector: 'app-puzzle',
  templateUrl: './puzzle.component.html',
  styleUrls: ['./puzzle.component.sass']
})
export class PuzzleComponent implements OnInit {
  public pieces: PuzzlePiece[];
  public puzzleGame: PuzzleGame;
  public pieceSelected: PuzzlePiece = null;
  public timer$: Observable<number>;
  public BASE_PATH: string = environment.apiGameUrl;
  public disableClick: boolean;
  public showHelper = true;
  public subscribe: Subscription;
  public statut = 'progress';
  public fullSreen: boolean;
  public animationTimer = false;

  @Output()
  completeGame: EventEmitter<Boolean> = new EventEmitter();

  @Input()
  themeId: number;
  constructor(
    private _themeService: ThemeService,
    private _deviceService: DeviceService,
    ) {}
  ngOnInit() {
    this.fullSreen = this._deviceService.isFullScreen();
    this.disableClick = false;
    this._themeService.getPuzzleGame(this.themeId).subscribe((res: any) => {
      this.puzzleGame = res;
      this.pieces = shuffle(
        this.puzzleGame.puzzle_pieces.map(n => ({
          id: n.id,
          piece_order: n.piece_order,
          image_path: n.image_path,
          rotate: 0
          // rotate: this.getRandomInt(3)
        }))
      );
    });
  }

  // @todo : à externaliser dans un helper
  getRandomInt(max: number) {
    const number = Math.floor(Math.random() * Math.floor(max));
    return number === 0 ? 0.5 : number;
  }

  /**
   * Check si le puzzle a été complété
   */
  checkPuzzle() {
    let check = true;
    let order = null;
    for (const piece of this.pieces) {
      if ((order !== null && order > piece.piece_order) || ( piece.rotate !== 0 && piece.rotate !== 0.5 )) {
        check = false;
      }
      order = piece.piece_order;
    }

    if (check) {
      // on met le chrono en pause + on affiche le puzzle fini avec un bravo + bouton qui emit true
      this.subscribe.unsubscribe();
      this.statut = 'victory';
    }
    // this.subscribe.unsubscribe();
  }

  getPuzzleClass(piece: PuzzlePiece) {
    return piece.rotate === 0.5 ? 'img-puzzle-rotatetmp' : 'img-puzzle-rotate' + piece.rotate;
  }

  /**
   * Action lancé suite au clic sur une piece
   * @param piece PuzzlePiece
   */
  switchPiece(piece: PuzzlePiece) {
    if (this.statut === 'progress') {
      if (this.pieceSelected === null) {
        this.pieceSelected = piece;
      } else {
        if (this.pieceSelected.id === piece.id) {
          // if (!this.disableClick) {
          //   this.disableClick = true;
          //   setTimeout(() => {
          //     this.disableClick = false;
          //   }, 1100);
          //   // on va effectuer une rotation de 90deg sur la piece
          //   const rotate = piece.rotate === 0.5 ? 0 : piece.rotate;
          //   piece.rotate = (rotate + 1) % 4;
          //   if (piece.rotate === 0) {
          //     setTimeout(() => {
          //       piece.rotate = 0.5;
          //       this.checkPuzzle();
          //     }, 1000);
          //   }
          // }
        } else {
          // on va switcher les 2 pieces
          this.switchPieceAction(piece);
          this.pieceSelected = null;
          this.checkPuzzle();
        }
      }
    }
  }

  /**
   * switcher 2 pieces de puzzle
   * @param piece PuzzlePiece
   */
  switchPieceAction(piece: PuzzlePiece) {
    const clickedIndex = this.pieces.findIndex(p => p.id === piece.id);
    const selectedIndex = this.pieces.findIndex(
      p => p.id === this.pieceSelected.id
    );

    this.pieces[selectedIndex] = piece;
    this.pieces[clickedIndex] = this.pieceSelected;
  }

  /**
   * Annule la selection d'une piece
   */
  cancelPieceSelected() {
    this.pieceSelected = null;

    this.checkPuzzle();
  }

  /**
   * Retourne la largeur d'une piece de puzzle en %
   */
  getPieceWidthStyle() {
    const nbCases = this.puzzleGame.nb_cases;
    const width = 100 / nbCases;
    return { width: width + '%' };
  }

  /**
   * Lance le puzzle
   */
  launchGame() {
    this.showHelper = false;
    // lance le chrono
    this.timer$ = interval(1000);
    this.subscribe = this.timer$.subscribe(val => {

      if (val > 0) {
        this.animationTimer = true;
      }

      if (val >= this.puzzleGame.time_limit) {
        this.statut = 'fail';
        this.subscribe.unsubscribe();
      }
    });
  }

  leavePuzzle() {
    if (this.statut === 'victory') {
      this.completeGame.emit(true);
    } else if (this.statut === 'fail') {
      this.completeGame.emit(false);
    }
  }

  winAuto() {
    this.statut = 'victory';
  }
}
