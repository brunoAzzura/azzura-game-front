import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../authentication/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PuzzleGameService {

  BASE_URL = environment.apiGameUrl;

  constructor(
    private _http: HttpClient,
    private _auth: AuthService
  ) { }

  updatePuzzleGame(puzzleGame) {
    return this._http.put(this.BASE_URL + 'puzzlegames', puzzleGame);
  }

  updatePuzzlePiece(puzzlePiece) {
    return this._http.put(this.BASE_URL + 'puzzlepieces', puzzlePiece);
  }

  deletePuzzlePiece(id) {
    return this._http.delete(this.BASE_URL + 'puzzlepieces/' + id);
  }

  getPieces(puzzleGameId) {
    return this._http.get(this.BASE_URL + 'puzzlegames/' + puzzleGameId + '/pieces' );
  }

}
