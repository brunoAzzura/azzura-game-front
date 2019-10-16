import { PuzzleGame } from './../../../interface/puzzle-game';
import { ThemeService } from './../../../service/theme.service';
import { LocalStorageService } from 'ngx-store';
import { PuzzleGameService } from './../../../service/puzzle-game.service';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { environment } from './../../../environments/environment';
import { Theme } from '../../../interface/theme';

const URL_ADD_PUZZLE_PIECE_IMG = environment.apiGameUrl + 'uploadFilePuzzlePiece';

@Component({
  selector: 'app-puzzle-gestion',
  templateUrl: './puzzle-gestion.component.html',
  styleUrls: ['./puzzle-gestion.component.sass']
})
export class PuzzleGestionComponent implements OnInit {

  public puzzlePieceAdded;
  public uploaderPuzzlePieceFile: FileUploader = new FileUploader({
        url: URL_ADD_PUZZLE_PIECE_IMG,
        itemAlias: 'puzzlePieceImage',
        authTokenHeader: 'Authorization',
        authToken: 'Bearer ' + this._localStorageService.get('token')
      });
  @ViewChild('selectedPuzzlePieceFile') selectedPuzzlePieceFile: any;
  public pieceSelected = null;
  public mode = 'insert';
  public addIsCollapsed = true;
  @Input() theme;
  public BASE_PATH = environment.apiGameUrl;
  public puzzlePieces = null;

  constructor(
    private _puzzleGameService: PuzzleGameService,
    private _localStorageService: LocalStorageService,
    private _themeService: ThemeService
  ) { }

  ngOnInit() {
    this.puzzlePieceAdded = {};
    this._puzzleGameService.getPieces(this.theme.puzzle_game.id).subscribe(
      (res) => {
        this.puzzlePieces = res;
      }
    );

    // ######### file upload images for puzzlePieces #############
    this.uploaderPuzzlePieceFile.onBuildItemForm = (fileItem: any, form: any) => {
      form.append('puzzle_game_id' , this.theme.puzzle_game.id);
      if ( this.mode === 'insert') {
        form.append('piece_order' , this.puzzlePieces.length + 1);
      } else {
        form.append('puzzle_piece_id' , this.puzzlePieceAdded.id);
      }
    };
    this.uploaderPuzzlePieceFile.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploaderPuzzlePieceFile.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      const piece = JSON.parse(response);
      if (this.puzzlePieces !== null && this.puzzlePieces.length > 0) {
        this.puzzlePieces.push(piece);
      } else {
        this.puzzlePieces = [piece];
      }
      this.cancelPuzzlePiece();
    };
  }

  updatePuzzleGame() {
    // @todo : tester si ne decroche pas les pieces attachés
    this._puzzleGameService.updatePuzzleGame(this.theme.puzzle_game.id).subscribe();
  }

  updatePuzzlePiece() {
    this.uploaderPuzzlePieceFile.uploadAll();
  }

  cancelPuzzlePiece() {
    this.mode = 'insert';
    this.addIsCollapsed = true;
    this.puzzlePieceAdded = {};
    this.uploaderPuzzlePieceFile.clearQueue();
    this.selectedPuzzlePieceFile.nativeElement.value = '';
  }

  cancelPieceSelected() {
    this.pieceSelected = null;
  }

  switchPiece (piece) {
    if (this.pieceSelected === null ) {
      this.pieceSelected = piece;
    } else if (this.pieceSelected.id !== piece.id) {
      // on va switcher les 2 pieces
      this.switchPieceAction(piece);
      this.pieceSelected = null;
    }
  }

  switchPieceAction(piece) {
    const puzzleGame = this.theme.puzzle_game;

    const selectedPieceOrder = this.pieceSelected.piece_order;
    this.pieceSelected.piece_order = piece.piece_order;
    piece.piece_order = selectedPieceOrder;

    // @todo : trouver autre moyen de transmettre le puzzleGame?
    piece.puzzle_game = {id : puzzleGame.id};
    this.pieceSelected.puzzle_game = {id : puzzleGame.id};

    this._puzzleGameService.updatePuzzlePiece(piece).subscribe();
    this._puzzleGameService.updatePuzzlePiece(this.pieceSelected).subscribe();

    this.cancelPieceSelected();
  }

  getPieceWidthStyle() {
    const nbCases = this.theme.puzzle_game.nb_cases;
    const width = 100 / nbCases;
    return {'width': width + '%' };
  }

  deletePiece(pieceId) {
    this._puzzleGameService.deletePuzzlePiece(pieceId).subscribe(
      (res) => {
        // @todo: update order manualy
        this._puzzleGameService.getPieces(this.theme.puzzle_game.id).subscribe(
          (pieces) => {
            this.puzzlePieces = pieces;
          }
        );
      }
    );
  }

}
