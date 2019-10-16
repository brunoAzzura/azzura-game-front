import { environment } from './../environments/environment';
import { ThemeService } from './theme.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MemoryCardService {

  BASE_URL = environment.apiGameUrl;

  constructor(
    private _http: HttpClient
  ) { }

  getGameCards (cards) {
    cards.push({name: 'back', image_path: null });
    const CARDS_TMP = cards.map(n => ({
      name: n.name,
      flipped: false,
      url: n.image_path === null ? `assets/${n}.png` : this.BASE_URL + n.image_path
    }));

    const CARDS_WITHOUT_BACK = CARDS_TMP.filter(c => c.name !== 'back');
    CARDS_WITHOUT_BACK.concat(CARDS_WITHOUT_BACK);
    return CARDS_WITHOUT_BACK.concat(CARDS_WITHOUT_BACK).map((c, i) => ({
      _id: i,
      name: c.name,
      flipped: c.flipped,
      url: c.url
    }));
  }

  deleteMemoryCard(id: number) {
    return this._http.delete(this.BASE_URL + 'memorycards/' + id);
  }
}
