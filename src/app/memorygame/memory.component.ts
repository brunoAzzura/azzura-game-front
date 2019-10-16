import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from './../environments/environment';
import { Observable } from 'rxjs';
import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';

import { GameActions } from '../store/action';
import { STATUS } from '../store/interface';

import { getGameCards } from '../store/model/card';
import { MemoryCardService } from '../service/memory-card.service';
import { ThemeService } from '../service/theme.service';
import { select } from '@angular-redux/store';

@Component({
  selector: 'app-memory-game',
  templateUrl: './memory.component.html',
  styleUrls: ['./memory.component.css']
})
export class MemoryComponent implements OnInit, OnDestroy {

  @Input() themeId;
  @Output() completeGame = new EventEmitter();

  public BASE_PATH = environment.apiGameUrl;
  public statusChanges;
  public memoryCardSubscribe;

  @select()
  status$: Observable<number>;

  constructor(
      private actions: GameActions,
      private _memoryCardService: MemoryCardService,
      private _themeService: ThemeService,
      private modalService: NgbModal
    ) {}

  ngOnInit() {
    // récupération des données pour le jeu de mémoire
    this.memoryCardSubscribe = this._themeService.getMemoryCards(this.themeId).subscribe(
      (res) => {
        const cards = this._memoryCardService.getGameCards(res);
        this.actions.updateStatus(STATUS.READY);
        this.actions.reset(cards);

        this.statusChanges = this.status$.subscribe(
          // si on detecte la fin du jeu, transmet au parent
          (status) => {
            // utiliser les constantes
            // @todo : ajouter un cas ou le joueur peut perdre
            // + svg des infos
            if (status === 2) {
              setTimeout(() => {
                this.actions.updateStatus(STATUS.READY);
                this.actions.reset(cards);
                this.completeGame.emit(true);
              }, 1500);
            } else if (status === 3) {
              setTimeout(() => {
                this.actions.updateStatus(STATUS.READY);
                this.actions.reset(cards);
                this.completeGame.emit(false);
              }, 1500);
            }
          }
        );
      }
    );
  }

  ngOnDestroy() {
    this.memoryCardSubscribe.unsubscribe();
    this.statusChanges.unsubscribe();
  }

  open(content) {
    this.modalService.open(content);
  }
}
