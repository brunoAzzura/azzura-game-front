import { Component } from '@angular/core'
import { select } from '@angular-redux/store'
import { Observable } from 'rxjs/Observable'

import { GameActions } from '../../store/action'
import { stop } from '../../helper/event'
import { STATUS } from '../../store/interface'

@Component({
  selector: 'status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent {
  @select()
  status$: Observable<number>
  @select()
  elapsedMs$: Observable<number>
  @select() nbTry$: Observable<number>;

  status: any

  constructor(private actions: GameActions) {
    this.status = STATUS
  }

  // le jeu se forme automatiquement, reset impossible
  // pourquoi l'event du click en parametre ?
  // reset(e: Event) {
  //   stop(e) // utilité ?
  //   this.actions.reset()
  // }
}

