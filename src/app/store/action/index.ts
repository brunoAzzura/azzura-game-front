import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';

import { isEmpty } from '../../helper/object';
import { IState, STATUS, ICard } from '../interface';

@Injectable()
export class GameActions {
  constructor(private ngRedux: NgRedux<IState>) {}

  static RESET = 'RESET';
  static UPDATE_STATUS = 'UPDATE_STATUS'; // status ready, play ...
  static UPDATE_LAST_SELECTED_CARD = 'UPDATE_LAST_SELECTED_CARD'; // derniere carte retournée
  static UPDATE_CARD_FLIPPED = 'UPDATE_CARD_FLIPPED'; // carte retourné
  static UPDATE_REMAINS = 'UPDATE_REMAINS'; // nombre de paires restantes à trouver
  static UPDATE_ELAPSED = 'UPDATE_ELAPSED'; // chrono
  static UPDATE_HIGHESTSPEED = 'UPDATE_HIGHESTSPEED'; // meilleur score
  static UPDATE_NB_TRY = 'UPDATE_NB_TRY'; // nombre d'essais maximum

  private timerId: any;

  reset(cards): void {
    this.ngRedux.dispatch({ type: GameActions.RESET, cards: cards });
  }

  updateStatus(status: STATUS): void {
    this.ngRedux.dispatch({ type: GameActions.UPDATE_STATUS, payload: status }); // stockage de la data

    // lance le timer si le status est à play
    if (status === STATUS.PLAYING) {
      this.timerId = setInterval(() => {
        this.ngRedux.dispatch({
          type: GameActions.UPDATE_ELAPSED,
          payload: +this.ngRedux.getState().elapsedMs + 1 // enlever le + ne change rien ...
        });
      }, 1000);
      // jeu fini + réinitialise le timer
    } else if (status === STATUS.PASS) {
      clearInterval(this.timerId);
      // sauvegarde le score (check status pass)
      this.ngRedux.dispatch({
        type: GameActions.UPDATE_HIGHESTSPEED,
        payload: this.ngRedux.getState().elapsedMs
      });
    } else if (status === STATUS.FAIL) {
      clearInterval(this.timerId);
    }
  }

  updateLastSelectedCard(card: ICard): void {
    this.ngRedux.dispatch({
      type: GameActions.UPDATE_LAST_SELECTED_CARD,
      payload: card
    });
  }

  updateCardFlipped(card: ICard): void {
    this.ngRedux.dispatch({
      type: GameActions.UPDATE_CARD_FLIPPED,
      payload: card
    });
  }

  // methode appelée lorsqu'une paire est trouvée
  match(): void {
    this.ngRedux.dispatch({
      type: GameActions.UPDATE_REMAINS,
      payload: +this.ngRedux.getState().remains - 1,
    });
  }

  // diminu de 1 le nombre d'essais
  decreaseNbTry(): void {
    this.ngRedux.dispatch({
      type: GameActions.UPDATE_NB_TRY,
      payload: +this.ngRedux.getState().nbTry - 1,
    });
  }

  // @todo : trouver ce qui retourne les cartes
  flipCard(card: ICard): any {
    const state = this.ngRedux.getState();
    this.updateCardFlipped(card);

    // début de la partie
    if (state.status === STATUS.READY) {
      this.updateStatus(STATUS.PLAYING);
    }
    // cas de la premiere carte que l'on retourne
    if (isEmpty(state.lastSelectedCard)) {
      return this.updateLastSelectedCard(card);
    }
    const nbTry = +state.nbTry - 1;
    // cas 2 mêmes cartes
    if (state.lastSelectedCard.name === card.name) {
      // this.decreaseNbTry();
      this.updateLastSelectedCard(null);
      this.match();
      const remains = +state.remains - 1;

      // if (remains && !nbTry) {
      //   this.updateStatus(STATUS.FAIL);
      // }

      // ##### si remains le retourne sinon fini le jeu #####
      // todo : ajouter un cas ou le jeu est perdu!
      return remains || this.updateStatus(STATUS.PASS);
    }

    // cas 2 cartes différentes
    this.decreaseNbTry();
    const lastCard = state.lastSelectedCard;
    this.updateLastSelectedCard(null);
    setTimeout(() => {
      this.updateCardFlipped(lastCard);
      this.updateCardFlipped(card);
    }, 1000);

    if (nbTry === 0) {
      this.updateStatus(STATUS.FAIL);
    }
  }
}
